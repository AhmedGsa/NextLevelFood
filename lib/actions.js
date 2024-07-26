'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

const isInvalidText = (text) => {
  return !text || text.trim() == '';
}

export const shareMeal = async (prevState, formData) => {
    const newMeal = {
      creator: formData.get('name'),
      creator_email: formData.get('email'),
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
    };
    if(
      isInvalidText(newMeal.title) ||
      isInvalidText(newMeal.creator) ||
      isInvalidText(newMeal.summary) ||
      isInvalidText(newMeal.instructions) ||
      !newMeal.image ||
      newMeal.image.size == 0
    ) {
      return { message: 'Invalid inputs !' };
    }
    await saveMeal(newMeal);
    revalidatePath('/meals');
    redirect('/meals');
  }
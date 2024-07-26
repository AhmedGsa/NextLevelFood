'use client';
import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
    const { pending } = useFormStatus();
    return <button type="submit" disabled={pending}>
        {pending ? 'Submiting...' : 'Share meal'}
    </button>
}
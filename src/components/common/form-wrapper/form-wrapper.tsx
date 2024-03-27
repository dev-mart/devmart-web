import React, {FC} from "react";

interface FormWrapperProps {
    onSubmit?: () => void;
    className?: string;
    actionUrl?: (formData: FormData) => void | string;
    children: React.ReactNode;
}

export const FormWrapper: FC<FormWrapperProps> = ({
                                                      onSubmit,
                                                      className,
                                                      actionUrl,
                                                      children
                                                  }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!onSubmit || (actionUrl && typeof actionUrl === 'function')) {
            return;
        }
        event.preventDefault();
        onSubmit();
    }

    return (
        <form
            className={className}
            onSubmit={handleSubmit}
            noValidate
            method={actionUrl ? undefined : 'post'}
            action={actionUrl || '#'}
        >
            {children}
        </form>
    );
}
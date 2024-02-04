import React, {FC} from "react";

interface FormWrapperProps {
    onSubmit: () => void;
    className?: string;
    actionUrl?: string;
    children: React.ReactNode;
}

export const FormWrapper: FC<FormWrapperProps> = ({
                                                      onSubmit,
                                                      className,
                                                      actionUrl,
                                                      children
                                                  }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    }

    return (
        <form
            className={className}
            onSubmit={handleSubmit}
            autoComplete="off"
            noValidate
            method="post"
            action={actionUrl || '#'}
        >
            {children}
        </form>
    )
}
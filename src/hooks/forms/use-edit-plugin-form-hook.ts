import {useForm} from "@/store/hooks/form/store.hooks";
import * as Validation from "@/helpers/validation.helper";
import {useEditPluginFormSubmitMiddleware} from "@/components/common/form-rows/edit-plugin-form-row/edit-plugin-form-submit-middleware.hook";
import {EditPluginFieldName} from "@/components/common/form-rows/edit-plugin-form-row/edit-plugin-form-row.enums";

export const useEditPluginForm = () => {
    const {error, afterSubmitMiddleware} = useEditPluginFormSubmitMiddleware();

    const {
        fm,
        eventHandlers: {handleChange, handleBlur, handleSubmit},
    } = useForm(
        [EditPluginFieldName.title],
        {
            [EditPluginFieldName.name]: {
                rules: [
                    {
                        error: 'Name must be at least 3 characters long',
                        validator: Validation.minLength(3)
                    },
                    {
                        error: 'Name must be at most 50 characters long',
                        validator: Validation.maxLength(50)
                    },
                ]
            },
            [EditPluginFieldName.description]: {
                rules: [
                    {
                        error: 'Description must be at least 10 characters long',
                        validator: Validation.minLength(10)
                    },
                    {
                        error: 'Description must be at most 150 characters long',
                        validator: Validation.maxLength(150)
                    }
                ]
            },
            [EditPluginFieldName.title]: {
                rules: [
                    {
                        error: 'Title must be at least 3 characters long',
                        validator: Validation.minLength(3)
                    },
                    {
                        error: 'Title must be at most 100 characters long',
                        validator: Validation.maxLength(100)
                    }
                ],
            },
            [EditPluginFieldName.body]: {
                rules: [
                    {
                        error: 'Please provide a body',
                        validator: Validation.hasValue
                    },
                    {
                        error: 'Body must be at most 10.000 characters long',
                        validator: Validation.maxLength(10000)
                    }
                ]
            },
            [EditPluginFieldName.custom]: {
                rules: [
                    {
                        error: 'Please select if this is a custom plugin',
                        validator: Validation.hasValue
                    }
                ]
            },
            [EditPluginFieldName.spigot_id]: {
                rules: [
                    {
                        error: 'Please provide a valid Spigot ID',
                        validator: Validation.isNumeric
                    }
                ]
            },
            [EditPluginFieldName.github_link]: {
                rules: [
                    {
                        error: 'Please provide a valid GitHub link: username/repo',
                        validator: Validation.isRegexp(/^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/)
                    }
                ]
            },
            [EditPluginFieldName.supported_versions]: {
                rules: [
                    {
                        error: 'Supported versions must be at most 255 characters long',
                        validator: Validation.maxLength(255)
                    }
                ]
            },
            [EditPluginFieldName.dependencies]: {
                rules: [
                    {
                        error: 'Dependencies must be at most 255 characters long',
                        validator: Validation.maxLength(255)
                    }
                ]
            },
            [EditPluginFieldName.categories]: {
                rules: [
                    {
                        error: 'Please select at least one category',
                        validator: Validation.hasValue
                    }
                ]
            },
            [EditPluginFieldName.price]: {
                rules: [
                    {
                        error: 'Please provide a valid price',
                        validator: Validation.isNumeric
                    },
                    {
                        error: 'Price must be positive',
                        validator: value => parseFloat(value) > 0
                    }
                ]
            },
            [EditPluginFieldName.icon]: {
                rules: []
            },
            [EditPluginFieldName.banner]: {
                rules: []
            },
            [EditPluginFieldName.donation_url]: {
                rules: []
            },
            [EditPluginFieldName.sale]: {
                rules: []
            },
        },
        {
            afterSubmitMiddleware
        }
    );

    return {
        fm,
        handleChange,
        handleBlur,
        handleSubmit,
        error
    }
}
import React from 'react';
import {PluginActionLayout} from "@/layouts/plugin-action-layout";
import {FormWrapper} from "@/components/common/form-wrapper/form-wrapper";
import {FieldsManager} from "@/store/hooks/fields-manager/fields-manager.interface";
import {EditPluginFormRow} from "@/components/common/form-rows/edit-plugin-form-row/edit-plugin-form-row";
import {useEditPluginForm} from "@/hooks/forms/use-edit-plugin-form-hook";
import {EditPluginFieldName} from "@/components/common/form-rows/edit-plugin-form-row/edit-plugin-form-row.enums";
import {StickyFooter} from "@/components/common/sticky-footer/sticky-footer";
import {Button} from "@/components/common/button/button";

export default function PluginListPage() {

    const {
        fm,
        error,
        handleSubmit,
        handleChange,
        handleBlur
    } = useEditPluginForm();

    return (
        <PluginActionLayout title="Add a New Plugin">

            <FormWrapper onSubmit={handleSubmit}>
                <EditPluginFormRow
                    fm={fm as FieldsManager<EditPluginFieldName>}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

                <StickyFooter>
                    <Button type="submit" disabled={fm.hasBeenSubmitted} className="md:w-2/4">
                        {fm.hasBeenSubmitted ? 'Adding Plugin...' : 'Add Plugin'}
                    </Button>
                </StickyFooter>
            </FormWrapper>

        </PluginActionLayout>
    );
};
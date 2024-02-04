"use client"

import React, {useState} from 'react';
import {AuthCard} from "@/components/common/auth-card/auth-card";
import {DiscordAuthButton} from "@/components/common/discord-auth-button/discord-auth-button";
import {Label} from "@/components/common/form/label/label";
import {Input} from "@/components/common/form/input/input";

export default function RegisterPage() {

    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <AuthCard title="Sign Up." subtitle="Welcome to Devmart 👋">
            <form onSubmit={onSubmit}>
                <DiscordAuthButton
                    label="Sign up with Discord"
                    href="/api/auth/discord/register"
                />

                <hr/>
                
                <div className="relative">
                    <Label label="Username" htmlFor="username" />
                    <Input 
                        name="username"
                        value={username}
                        className="block mt-1 w-full"
                        maxLength={50}
                        placeholder="Username"
                        required
                        type={"text"}
                    />
                </div>

            </form>
        </AuthCard>
    )
}
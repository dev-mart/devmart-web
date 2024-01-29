"use client"

import React, {useState} from 'react';
import {DiscordAuthButton} from "@/components/common/discord-auth-button/discord-auth-button";
import {ValidationError} from "@/components/common/form/validation-error/validation-error";
import {Label} from "@/components/common/form/label/label";
import {Input} from "@/components/common/form/input/input";
import Link from "next/link";
import {Button} from "@/components/common/button/button";
import {AuthCard} from '@/components/common/auth-card/auth-card';
import {useRouter} from "next/navigation";
import AuthService from "@/services/AuthService";

export default function LoginPage({
                                      searchParams
                                  }: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const [error, setError] = useState<string | undefined>();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setError(undefined);

        try {
            const response = await AuthService.login({
                username,
                password,
            });

            if (response.status === 200) {
                router.push(searchParams['redirect'] as string || '/');
            } else {
                setError(response.data.message || 'Something went wrong. Please try again later.');
            }
        } catch (e) {
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthCard title="Login." subtitle="Hi, welcome back 👋">
            <form onSubmit={onSubmit}>
                <DiscordAuthButton
                    label="Login with Discord"
                    href="/api/auth/discord/login"
                />

                <hr/>

                <div className="mt-4">
                    <Label htmlFor="username" label="Username or Email"/>
                    <Input
                        id="username"
                        value={username}
                        onInput={setUsername}
                        className="block mt-1 w-full"
                        placeholder="Username"
                        autocomplete="username"
                        required
                        type="text"
                    />
                </div>

                <div className="mt-2">
                    <Label htmlFor="password" label="Password"/>
                    <Input
                        id="password"
                        value={password}
                        onInput={setPassword}
                        className="block mt-1 w-full"
                        placeholder="Password"
                        required
                        type="password"
                        autocomplete="current-password"
                    />
                </div>

                {error && <ValidationError message={error}/>}

                <div className="flex flex-row mt-2 center justify-between">
                    <Link className="underline text-sm" href="/reset-password">Forgot your password?</Link>
                </div>

                <div className="flex flex-col items-center justify-end mt-4">
                    <Button disabled={loading}>
                        {loading ? 'Logging you in...' : 'Log in'}
                    </Button>
                </div>
                <div className="mt-4 text-center flex gap-2 justify-center items-center">
                    No account yet?
                    <Link href="/register">Sign up Now!</Link>
                </div>
            </form>
        </AuthCard>
    );
}
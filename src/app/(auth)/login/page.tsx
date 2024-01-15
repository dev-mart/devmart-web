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
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setErrors({});

        try {
            await AuthService.requestCsrfToken();
            const response = await AuthService.login({
                username,
                password,
                remember
            });

            if (response.status === 200) {
                router.push(searchParams['redirect'] as string || '/');
            } else {
                setErrors(response.data.errors);
            }
        } catch (e) {
            // @ts-ignore
            setErrors(e?.response?.data?.errors || {
                'general': ['Something went wrong. Please try again later.']
            });
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

                <ValidationError errors={errors} item="discord"/>

                <hr/>

                <div className="mt-4">
                    <Label htmlFor="username" label="Username or Email"/>
                    <Input
                        id="username"
                        value={username}
                        errors={errors}
                        item="username"
                        onInput={setUsername}
                        className="block mt-1 w-full"
                        required
                        type="text"
                    />
                </div>
                <ValidationError errors={errors} item="username"/>

                <div>
                    <Label htmlFor="password" label="Password"/>
                    <Input
                        id="password"
                        value={password}
                        errors={errors}
                        item="password"
                        onInput={setPassword}
                        className="block mt-1 w-full"
                        required
                        type="password"
                        autocomplete="current-password"
                    />
                </div>
                <ValidationError errors={errors} item="password"/>

                <ValidationError errors={errors} item="general"/>

                <div className="flex flex-row mt-2 center justify-between">
                    <label className="inline-flex items-center h-full" htmlFor="remember_me">
                        <Input
                            id="remember_me"
                            checked={remember}
                            value={remember ? '1' : '0'}
                            onChange={setRemember}
                            type="checkbox"
                        />

                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                    </label>
                    <div>
                        <Link className="underline text-sm" href="/reset-password">Forgot your password?</Link>
                    </div>
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
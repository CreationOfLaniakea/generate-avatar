'use client';

import React, {type JSX, useEffect, useState} from "react";
import Image from "next/image";
import ButtonGradient from "@/components/ButtonGradient";
import ButtonSignin from "@/components/ButtonSignin";
import {useCommonContext} from "@/context/common-context";
import {collect_user_info} from "@/server/image_user";

const sleep = (ms: number) => {
    return new Promise((r) => setTimeout(r, ms));
};

const cta: JSX.Element = <ButtonSignin extraStyle="btn-primary" />;

const DownloadButton: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = imageUrl.split('/').pop() ?? 'downloaded-image.jpg';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <button className="btn btn-accent" onClick={handleDownload}>Download Image</button>
    );
};

export default function PageComponent() {
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [submit, setSubmit] = useState(true);

    const {
        user,
        showLogoutModal,
    } = useCommonContext()

    const handleSubmit = async (e) => {
        e.preventDefault();

        //限制策略

        const requestData = {
            textStr: e.target.prompt.value,
            email: user?.email,
        }

         const response1 = await fetch(`/api/chat/generateAvatar`, {
             method: 'POST',
             body: JSON.stringify(requestData)
         });

        const data = response1.body;
        const reader = data.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
        while (!done) {
            const { value, done: readerDone } = await reader.read();
            if (value) {
                const str = decoder.decode(value, {stream: true});

                const user: { resultsUser: boolean } = JSON.parse(str);
                if(user.resultsUser) {
                    alert("The website is currently starting up, with a limit of 20 uses per day. Please come back tomorrow!!");
                    return;
                }
            }
            done = readerDone;
        }

        //执行
        setSubmit(false);
        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: e.target.prompt.value,
            }),
        });
        let prediction = await response.json();
        if (response.status !== 201) {
            setError(prediction.detail);
            return;
        }
        setPrediction(prediction);

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
            ) {
            await sleep(3000);
            const response = await fetch("/api/predictions/" + prediction.id);
            console.log("prediction_id:", prediction.id);
            prediction = await response.json();
            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
            setPrediction(prediction);

            // if(prediction.output) {
            //     //图片存储
            //     const requestData = {
            //         image: prediction.output[prediction.output.length - 1],
            //         email: user?.email,
            //     }
            //
            //     const response_image = await fetch(`/api/chat/userImage`, {
            //         method: 'POST',
            //         body: JSON.stringify(requestData)
            //     });
            // }

        }
        setSubmit(true);
    };

    return (
        <div className="container max-w-2xl mx-auto p-5">
            <h1 className="py-6 text-center font-bold text-2xl">
                Write something to generate an avatar...
            </h1>

            {
                showLogoutModal? (
                    <form className="flex items-center w-full flex" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="flex-grow"
                            name="prompt"
                            placeholder="Enter a prompt to display an avatar"
                        />
                        {
                            <ButtonGradient
                                submit={submit}
                                title = "GO!"
                            />
                        }
                    </form>
                ) : (
                    <form className="flex items-center w-full flex">
                        <input
                            type="text"
                            className="flex-grow"
                            name="prompt"
                            placeholder="Enter a prompt to display an avatar"
                        />
                        {
                            <div className="hidden lg:flex lg:justify-end lg:flex-1">
                                <ButtonSignin
                                    text="GO!"
                                ></ButtonSignin>
                            </div>
                        }
                    </form>
                )
            }

            {error && <div>{error}</div>}

            {prediction && (
                <>
                    {prediction.output && (
                        <div className="image-wrapper mt-5">
                            <DownloadButton imageUrl={prediction.output[prediction.output.length - 1]} />
                            <Image
                                className="rounded-full object-cover"
                                src={prediction.output[prediction.output.length - 1]}
                                alt="output"
                                sizes="100vw"
                                height={768}
                                width={768}
                            />
                        </div>
                    )}
                    <p className="py-3 text-rose-700 text-xl font-bold opacity-50">status: {prediction.status} (Do not refresh.)</p>
                </>
            )}
        </div>
    );
}
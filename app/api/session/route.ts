import { NextResponse } from 'next/server';

export async function POST() {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set');
        }

        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview-2024-12-17",
                voice: "alloy",
                modalities: ["audio", "text"],
                instructions: "Ikaw si Alex, isang highly skilled at proficient na full-stack software developer na nagtatrabaho under Master E. Expert ka sa Node.js, React.js, HTML, CSS, Tailwind CSS, JavaScript, at APIs—kaya mong i-handle pareho ang front-end at back-end development. Bawat task na binibigay sa’yo, tinatrato mo na parang para sa isang live at production-level environment. Lahat ng sagot mo ay precise, fully tested, at 100% accurate—walang bara-bara. Hindi ka nag-a-assume o nanganghula. Bawat response mo, pinag-iisipan mong mabuti para walang nasasayang na oras. Kapag humingi si Master E ng code, lagi kang nagbibigay ng kumpleto, functional, at production-ready code. Pag nire-rewrite mo ang code, full version lagi—walang putol o skipped na lines. Hindi ka gumagamit ng terms na “old CSS” o “old JavaScript.” At kapag pinagawa ka ng HTML file o page, ni-la-merge mo ang CSS, JavaScript, at HTML sa isang buo at integrated na file. Kapag may binigay na screenshot si Master E—website man o PWA mobile app—dapat sundin mo nang eksakto ang design na nasa image. Kung sakaling hindi mo ma-replicate nang eksakto yung design from the screenshot, kailangan mong sabihin agad kay Master E at mag-suggest na gamitin na lang mismo yung image as fallback para ma-meet yung design requirements. Importante rin: Bago ka magsimula sa kahit anong task na iutos ni Master E, kailangan mo muna humingi ng permiso. Laging mag-confirm muna kung pwede ka nang mag-proceed bago gawin ang kahit ano.",
                tool_choice: "auto",
            }),
        });

        if (!response.ok) {
            // It's better to log the response body if available for more details on API errors
            const errorBody = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
        }

        const data = await response.json();

        // Return the JSON response to the client
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching session data:", error);
        // Return a more informative error response if possible
        return NextResponse.json({ error: "Failed to fetch session data", details: error.message }, { status: 500 });
    }
}
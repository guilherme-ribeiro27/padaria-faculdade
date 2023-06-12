import Head  from "next/head";

type HeadProps = {
    title: string;
}
export default function HeadComponent({title}:HeadProps) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
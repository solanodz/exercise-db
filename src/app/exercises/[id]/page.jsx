
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server"
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ExerciseIdPage = async ({ params }) => {
    const { id } = params;
    const supabase = createClient();
    const { data: exercise } = await supabase
        .from("exercises")
        .select()
        .eq('id', id)
        .single();

    console.log(exercise);

    const videoId = exercise.video_url.split('v=')[1];

    return (
        <div className="max-w-xl mx-2 sm:my-12 sm:mx-auto flex flex-col gap-4">
            <div className="mx-auto w-full flex justify-center">
                <iframe
                    height={315}
                    width={576}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-xl border border-slate-200"
                />
            </div>
            <div className="flex items-center justify-between">
                <Link href="/exercises" className={` text-left text-sm flex gap-2 mr-auto ${buttonVariants({ variant: 'link' })}`} ><ArrowLeft size={18} />Back to exercises page</Link>
                <Image src='/detraining-logo.png' width={80} height={80} alt='Devning+' />
            </div>

            <div className="mx-auto">
                <Card className='min-w-xl'>
                    <CardHeader>
                        <h2 className="text-2xl font-bold tracking-tighter">{exercise.name}</h2>
                        <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default ExerciseIdPage

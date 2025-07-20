import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const FormSchema = z.object({
    otp: z.number().min(6,{
        message: "Invalid OTP.",
    }).max(6, {
        message: "Invalid OTP.",
    }),
})

function OtpVerification() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <div className="flex flex-col min-h-[50vh] h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-md w-md border-none shadow-none rounded-none">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold mb-4">Verify</CardTitle>
                    <CardDescription className="font-bold text-black">
                        Please enter th e code generated one time password to
                    verify your account.
                    </CardDescription>
                    <CardDescription>
                        A code has been sent to *******9897
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20">
                            <div className="flex gap-4 flex-col items-center ">
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={() => (
                                        <FormItem className="grid gap-2">
                                            <FormControl>
                                                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                                                    <InputOTPGroup className="flex space-x-3">
                                                        <InputOTPSlot index={0} className="h-14 w-14 text-2xl border-1 border-black" />
                                                        <InputOTPSlot index={1} className="h-14 w-14 text-2xl border-1 border-black" />
                                                        <InputOTPSlot index={2} className="h-14 w-14 text-2xl border-1 border-black" />
                                                        <InputOTPSlot index={3} className="h-14 w-14 text-2xl border-1 border-black" />
                                                        <InputOTPSlot index={4} className="h-14 w-14 text-2xl border-1 border-black" />
                                                        <InputOTPSlot index={5} className="h-14 w-14 text-2xl border-1 border-black" />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                              
                                <Button type="submit" className="w-full bg-[#3454D1] py-6 rounded-[5px]">
                                    Velidate
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default OtpVerification

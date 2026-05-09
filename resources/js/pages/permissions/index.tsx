import { Head, useForm, usePage } from '@inertiajs/react';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useEffectEvent, useState } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Permission } from '@/types/role_permission';
// import { Field, FieldGroup } from '@/components/ui/field';

export default function Dashboard({permissions} : {permissions: Permission}) {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const {data, setData, post, processing, errors, reset} = useForm({name: ''});

    const [permissionDialog, setPermissionDialog] = useState(false);

    //
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
       post('/permissions', {
            onSuccess: () => {

               //  setPermissionDialog(false);
               // const message = page.props.flash?.message;
               //  if (message) {
               //      toast.success(flash.message);
               //  }

                reset('name');
            }
        })
    }

    // const onFlashMessage = useEffectEvent((message: string) => {
    //     setPermissionDialog(false);
    //     toast.success(message);
    // })

    const {flash} = usePage<{flash: {message?: string }}>().props;
    useEffect(() => {
        if (flash.message) {
           toast.success(flash.message);

           setTimeout(() => setPermissionDialog(false), 0);
        }
    }, [flash.message])


    return (
        <>
            <Head title="Permissions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Permissions Management</CardTitle>
                        <CardAction>
                            <Button variant={'default'} onClick={() => {
                                setPermissionDialog(true)
                            }}> Add New</Button>
                        </CardAction>
                    </CardHeader>
                    <hr />
                    <CardContent>
                        <Table>
                            <TableHeader className="bg-slate-500 dark:bg-slate-700">
                                <TableRow>
                                    <TableHead
                                        className={'font-bold text-white'}
                                    >
                                        ID
                                    </TableHead>
                                    <TableHead
                                        className={'font-bold text-white'}
                                    >
                                        Name
                                    </TableHead>
                                    <TableHead
                                        className={'font-bold text-white'}
                                    >
                                        Created At
                                    </TableHead>
                                    <TableHead
                                        className={'font-bold text-white'}
                                    >
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {permissions.data.map((permission, index) => (
                                    <TableRow
                                        className={
                                            'odd:bg-slate-100 dark:odd:bg-slate-800'
                                        }
                                        key={index}
                                    >
                                        <TableCell>{permission.id}</TableCell>
                                        <TableCell>{permission.name}</TableCell>
                                        <TableCell>{permission.created_at}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant={'outline'}
                                                size={'sm'}
                                                className={'gap-2'}
                                            >
                                                <Pencil size={16} /> Edit
                                            </Button>
                                            <Button
                                                className={'m-2 gap-2'}
                                                variant={'destructive'}
                                            >
                                                <Trash2 size={18} /> Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                {/*  Add new permission dialog start  */}

                <Dialog open={permissionDialog} onOpenChange={setPermissionDialog}>
                        <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>Add new Permission</DialogTitle>
                            </DialogHeader>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div className={'grid gap-4'}>
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Permission Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type={'text'}
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            aria-invalid={!!errors.name}
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                </div>
                                <DialogFooter className={'mt-4'}>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={processing}>
                                        {processing && <Loader2 className={'animate-spin'} />}
                                        <span>Create</span>
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                </Dialog>

                {/*  Add new permissions dialog end  */}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Permissions',
            href: '/permissions',
        },
    ],
};

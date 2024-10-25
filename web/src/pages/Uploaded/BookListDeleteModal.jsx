import { Button, Divider, Group, Modal, Text, Title } from "@mantine/core";
import { Warning } from "@phosphor-icons/react";
import { deleteBookAndDataCompletely } from "../../appwrite/deleteBookAndDataCompletely";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function BookListDeleteModal({ isOpened, close, bookId }) {
    const queryClient = useQueryClient()

    // status can be idle, pending, success, error
    const { mutateAsync: deleteBook, status } = useMutation({
        mutationFn: deleteBookAndDataCompletely,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["book"] })
        }
    })

    const handleDelete = async () => {
        try {
            await deleteBook(bookId)
            close()
            toast.success('Deleted Successfully')
        } catch (error) {
            close()
            toast.error(error.message)
            console.error(error)
        }
    }

    return (
        <Modal radius={'xl'} styles={{
            header: {
                display: 'none'
            }
            , body: {
                padding: '1.5rem',
                paddingBottom: '1rem', paddingRight: '1.5rem', paddingLeft: '1.5rem',
            }
        }} centered opened={isOpened} onClose={close} title="Authentication">
            <Group gap={'xs'} wrap="nowrap" >
                <Warning size={42} weight="light" />
                <Title order={4} fw={500}>Delete Content?</Title>
            </Group>
            <Divider my={'sm'} />
            <Text fz={'sm'} color="dimmed">Are you sure you want to delete this content?</Text>
            <Group gap={'sm'} justify="flex-end" mt="md" mb="xs">
                <Button onClick={close} disabled={status == 'pending'} variant="transparent" color="rgba(0, 0, 0, 1)" size="xs">Cancel</Button>
                <Button variant="light" loading={status == 'pending'} loaderProps={{ type: 'oval' }} onClick={handleDelete} color="rgba(0, 0, 0, 1)" size="xs">Delete</Button>
            </Group>
        </Modal>
    )
}
export default BookListDeleteModal;
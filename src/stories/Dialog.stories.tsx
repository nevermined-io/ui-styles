import { Meta, StoryObj } from '@storybook/react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from '@/ui/Dialog'
import { Button } from '@/ui/Button'
import { Label } from '@/ui/Label'
import { Input } from '@/ui/Input'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const DefaultDialog: StoryObj<typeof Dialog> = {
  args: {},
  render: () => (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="primary">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent css={{ maxWidth: '425px' }}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div css={{ display: 'grid', gap: '1rem' }}>
            <div>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" />
            </div>
            <div>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  ),
}

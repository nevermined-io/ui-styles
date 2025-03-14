import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs"
import { Meta, StoryObj } from "@storybook/react"

// Meta bilgileri ve component'in temel özelliklerini tanımlayalım
const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

export const Default: StoryObj<typeof Tabs> = {
  render: () => (
    <div css={{ width: "500px" }}>
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>

        <TabsContent value="tab1">Content for Tab 1</TabsContent>
        <TabsContent value="tab2">Content for Tab 2</TabsContent>
        <TabsContent value="tab3">Content for Tab 3</TabsContent>
      </Tabs>
    </div>
  ),
}

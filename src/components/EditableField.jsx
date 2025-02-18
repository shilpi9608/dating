"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"



export function EditableField({ label, value, onSave, inputType = "text" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const handleSave = () => {
    onSave(tempValue)
    setIsOpen(false)
  }

  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <h3 className="font-medium text-sm text-muted-foreground">{label}</h3>
        <p className="text-lg">{value}</p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {label}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {label}
              </Label>
              <Input
                id="name"
                type={inputType}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


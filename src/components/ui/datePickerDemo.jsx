"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // 1. Importar locale español
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo({ field }) {
return (
    <Popover>
    <PopoverTrigger asChild>
        <Button
        variant={"outline"}
        className={cn(
            "w-[240px] justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
        )}
        >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {field.value
            ? format(field.value, "PPP", { locale: es }) // 2. Mostrar fecha en español
            : <span>Selecciona una fecha</span>}
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
        <Calendar
        mode="single"
        selected={field.value}
        onSelect={field.onChange}
        initialFocus
        locale={es} // 3. Traducir calendario
        />
    </PopoverContent>
    </Popover>
);
}

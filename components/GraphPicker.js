"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IoChevronDown } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

export default function GraphPicker({
    exerciseNames,
    graphValue,
    setGraphValue,
}) {
    const [nameOpen, setNameOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    return (
        <Card className="pt-6 px-2">
            <CardContent>
                <Popover open={nameOpen} onOpenChange={setNameOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-full justify-between mx-auto",
                                !graphValue && "text-muted-foreground"
                            )}
                        >
                            {graphValue && graphValue !== ""
                                ? exerciseNames.find(
                                      (exerciseName) =>
                                          exerciseName.value === graphValue
                                  )?.label
                                : "Select name"}
                            <IoChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Command>
                            <CommandInput
                                placeholder="Search name..."
                                className="h-9 w-full"
                                onValueChange={(value) => {
                                    setInputValue(value);
                                }}
                            />
                            <CommandEmpty>
                                {exerciseNames && exerciseNames.length > 0
                                    ? `${inputValue} not found.`
                                    : "Log a workout to get started!"}
                            </CommandEmpty>
                            <CommandGroup>
                                <CommandList>
                                    {exerciseNames.map((exerciseName) => (
                                        <CommandItem
                                            value={exerciseName.label}
                                            key={exerciseName.value}
                                            onSelect={() => {
                                                setGraphValue(
                                                    exerciseName.value
                                                );
                                                setNameOpen(false);
                                            }}
                                        >
                                            {exerciseName.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    exerciseName.value ===
                                                        graphValue
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </CardContent>
        </Card>
    );
}

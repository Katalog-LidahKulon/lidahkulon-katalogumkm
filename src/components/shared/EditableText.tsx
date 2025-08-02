"use client";

import React, { useState, useRef } from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";

export interface EditableTextProps {
	value: string;
	onUpdate: (newValue: string) => Promise<void>;
	className?: string;
	placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ value, onUpdate, className = "", placeholder = "" }) => {
	const [oldValue, setOldValue] = useState(value);
	const editableRef = useRef<HTMLSpanElement>(null);

	const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
		setOldValue(e.currentTarget.textContent?.trim() || "");
	};

	const handleBlur = async (e: React.FocusEvent<HTMLElement>) => {
		const newValue = e.currentTarget.textContent?.trim() || "";

		if (newValue !== oldValue) {
			try {
				await onUpdate(newValue);
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (err) {
				if (editableRef.current) {
					editableRef.current.textContent = oldValue;
				}
			}
		}
	};

	return (
		<span className="h-fit w-full flex gap-1">
			<Pencil2Icon key={oldValue} className="shrink-0 size-3 text-neutral-400" />

			<span
				ref={editableRef}
				key={`${String(Symbol(value))}`}
				contentEditable
				suppressContentEditableWarning
				spellCheck={false}
				onFocus={handleFocus}
				onBlur={handleBlur}
				className={`cursor-pointer w-full hover:bg-black/5 active:bg-black/10 ${className}`}
			>
				{value || placeholder}
			</span>
		</span>
	);
};

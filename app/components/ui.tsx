"use client";

import React from "react";
import { cn } from "../lib/utils";

// ==========================
// Button
// ==========================
type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "pill" | "icon";
type ButtonSize = "sm" | "default" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}

const buttonVariantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border-0",
    secondary: "bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-white/10 shadow-sm",
    ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-white/5 text-foreground",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm border-0",
    pill: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm rounded-full border-0",
    icon: "bg-transparent hover:bg-zinc-100 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground p-0",
};

const buttonSizeStyles: Record<ButtonSize, string> = {
    sm: "h-10 px-3.5 text-[13px]",
    default: "h-11 px-5 text-[14px]",
    lg: "h-12 px-6 text-[15px]",
};

const shapeForVariant: Record<ButtonVariant, string> = {
    primary: "rounded-[8px]",
    secondary: "rounded-[8px]",
    ghost: "rounded-[6px]",
    destructive: "rounded-[8px]",
    pill: "rounded-full",
    icon: "rounded-full w-11 h-11",
};

export function Button({ variant = "primary", size = "default", loading = false, className, disabled, children, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "active:scale-[0.98]",
                buttonVariantStyles[variant],
                variant !== "icon" && buttonSizeStyles[size],
                shapeForVariant[variant],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
            {children}
        </button>
    );
}

// ==========================
// Avatar
// ==========================
export interface AvatarProps {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: "sm" | "default" | "lg";
    className?: string;
}

const avatarSizeStyles: Record<string, string> = {
    sm: "w-7 h-7 text-[10px]",
    default: "w-9 h-9 text-[12px]",
    lg: "w-12 h-12 text-[14px]",
};

export function Avatar({ src, alt, fallback, size = "default", className }: AvatarProps) {
    const [error, setError] = React.useState(false);
    const initials = fallback || alt?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";

    if (src && !error) {
        return <img src={src} alt={alt || "Avatar"} onError={() => setError(true)} className={cn("rounded-full object-cover ring-1 ring-white/10", avatarSizeStyles[size], className)} />;
    }
    return (
        <div className={cn("rounded-full flex items-center justify-center font-bold bg-zinc-200 dark:bg-white/[0.08] text-muted-foreground ring-1 ring-black/5 dark:ring-white/10", avatarSizeStyles[size], className)}>
            {initials}
        </div>
    );
}

// ==========================
// ScrollArea
// ==========================
export interface ScrollAreaProps {
    children: React.ReactNode;
    className?: string;
}

export function ScrollArea({ children, className }: ScrollAreaProps) {
    return (
        <div
            className={cn(
                "overflow-auto overscroll-contain flex flex-col h-full",
                "[&::-webkit-scrollbar]:w-[6px]",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/[0.1]",
                "[&::-webkit-scrollbar-thumb]:rounded-full",
                "hover:[&::-webkit-scrollbar-thumb]:bg-black/20 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/[0.2]",
                className
            )}
        >
            {children}
        </div>
    );
}

// ==========================
// Textarea
// ==========================
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={cn(
                "w-full min-h-[44px] px-3.5 py-3 text-[14px] font-medium resize-none",
                "bg-black/[0.03] dark:bg-white/[0.06] ring-1 ring-black/[0.12] dark:ring-white/10 rounded-[24px] focus:ring-primary/50",
                "text-foreground placeholder:text-muted-foreground/50",
                "focus:outline-none",
                "disabled:opacity-50 disabled:pointer-events-none",
                "transition-all duration-200",
                className
            )}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

// ==========================
// GlassCard
// ==========================
export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "raised" | "inset";
}

export function GlassCard({ variant = "default", className, ...props }: GlassCardProps) {
    const variantClasses = {
        default: "bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-[10px] shadow-sm",
        raised: "bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-xl shadow-md hover:shadow-lg transition-all duration-200",
        inset: "bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-[16px]",
    };

    return <div className={cn(variantClasses[variant], className)} {...props} />;
}

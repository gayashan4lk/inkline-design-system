import type * as React from 'react';

export type Tone = 'paper' | 'canvas' | 'lilac' | 'sage' | 'peach' | 'periwinkle' | 'mint' | 'stone' | 'rose' | 'clay';
export type IconName = 'play' | 'pause' | 'restart' | 'comment' | 'volume' | 'download' | 'expand' | 'sidebar' | 'check' | 'plus' | 'close' | 'search' | 'more';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = soft blue + outline; secondary = paper + outline; accent = rose + outline; ghost = no border. Default primary. */
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  /** sm 32px · md 40px (default) · lg 48px. Text, icon, padding and corner radius scale; the 2px outline does not. */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon. With no children the button becomes a round icon button: pass aria-label (the bundle warns in the console without one). */
  icon?: IconName;
  iconAfter?: IconName;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;

/** Cards are static containers: they take no click handler and never act as buttons or links. They lift 2px with shadow-lift on hover (no movement with reduced motion). */
export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'tabIndex' | 'role'> {
  /** Fill color. Default paper. */
  tone?: Tone;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Mono caption set above the card, like a file name. */
  caption?: React.ReactNode;
  /** Semantic wrapper element, e.g. "section" or "article". "button" and "a" are not allowed and fall back to "div". */
  as?: 'div' | 'section' | 'article' | 'aside' | 'li';
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): React.ReactElement;

export interface StatTileProps extends React.HTMLAttributes<HTMLElement> {
  /** Short ALL-CAPS label, e.g. "# Demos recorded". */
  label: React.ReactNode;
  /** The value, set in the serif display face. */
  value: React.ReactNode;
  /** Default lilac. */
  tone?: Tone;
}
export declare function StatTile(props: StatTileProps): React.ReactElement;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Error message; turns the border danger and sets aria-invalid. Replaces the hint. */
  error?: React.ReactNode;
}
export declare function Input(props: InputProps): React.ReactElement;

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Pastel fill, or "mention" for an inline @mention chip. Default stone. */
  tone?: 'stone' | 'lilac' | 'sage' | 'peach' | 'periwinkle' | 'mint' | 'rose' | 'mention';
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): React.ReactElement;

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Person or agent name; used for aria-label and the initial. With neither name nor initial the avatar is decorative (aria-hidden). */
  name?: string;
  /** Override the initial shown. */
  initial?: string;
  /** Default periwinkle. */
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
}
export declare function Avatar(props: AvatarProps): React.ReactElement;

export interface CommentItem {
  id?: string;
  author: string;
  initial?: string;
  tone?: Tone;
  /** Optional timecode or relative time, shown in mono. */
  time?: string;
  body: React.ReactNode;
}
export interface CommentThreadProps {
  /** Panel title. Default "Comment". */
  title?: string;
  comments: CommentItem[];
  resolved?: boolean;
  /** Hide the resolve button with false. */
  resolvable?: boolean;
  onResolve?: () => void;
  /** Footer slot, typically a reply Input. */
  children?: React.ReactNode;
  className?: string;
}
export declare function CommentThread(props: CommentThreadProps): React.ReactElement;

export interface MediaControlsProps {
  playing?: boolean;
  /** 0–1 across the whole timeline. The track is a keyboard slider: arrows step 5%, Page Up/Down 10%, Home/End jump to the ends. */
  progress?: number;
  /** Relative lengths of chapters / clips; drawn as separate pills. Default one segment. */
  segments?: number[];
  /** Right-hand icon buttons, in order. Default comment, volume, download, expand. */
  actions?: Array<'comment' | 'volume' | 'download' | 'expand'>;
  /** Show the divider + side-panel toggle. Default true. */
  panelToggle?: boolean;
  /** Spoken value for the seek slider, e.g. "0:14 of 1:02". */
  valueText?: string;
  label?: string;
  onPlayToggle?: () => void;
  onRestart?: () => void;
  onSeek?: (progress: number) => void;
  onAction?: (action: string) => void;
  className?: string;
}
export declare function MediaControls(props: MediaControlsProps): React.ReactElement;

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  /** px, default 20. */
  size?: number;
  /** Default 2. */
  strokeWidth?: number;
  /** Gives the icon role="img" and a label; omit for decorative icons. */
  title?: string;
}
export declare function Icon(props: IconProps): React.ReactElement;

/** 'light' or 'dark' forces a theme (sets <html data-theme>); 'system' follows the OS setting and its changes. The bundle starts in 'system' unless data-theme is already set. */
export declare function setTheme(theme: 'light' | 'dark' | 'system'): void;

declare global {
  interface Window {
    Inkline: {
      Button: typeof Button; Card: typeof Card; StatTile: typeof StatTile; Input: typeof Input; Tag: typeof Tag;
      Avatar: typeof Avatar; CommentThread: typeof CommentThread; MediaControls: typeof MediaControls; Icon: typeof Icon; setTheme: typeof setTheme;
    };
  }
}

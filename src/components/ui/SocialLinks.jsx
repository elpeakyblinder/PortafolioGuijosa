import { Github, Linkedin, Mail } from "lucide-react";

export default function SocialLinks() {
    return (
        <div className="flex row gap-4">
            <a
                href="https://github.com/elpeakyblinder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[var(--clr-accent)] transition-colors"
            >
                <Github size={20} />
            </a>
            <a
                href="https://linkedin.com/in/carlos-guijosa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[var(--clr-accent)] transition-colors"
            >
                <Linkedin size={20} />
            </a>
            <a
                href="mailto:devcharlying@gmail.com"
                className="flex items-center gap-2 hover:text-[var(--clr-accent)] transition-colors"
            >
                <Mail size={20} />
            </a>
        </div>
    );
}

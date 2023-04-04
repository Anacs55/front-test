export function backgroundGenerator(color: string, color2?: string): string {
    if(color2) return `background: linear-gradient(45deg, ${color} 0%, ${color2} 100%)`;
    else return 'background-color: ' + color;
}
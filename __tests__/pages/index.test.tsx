// __tests__/pages/index.test.tsx
import { render, screen } from '@testing-library/react';
import Page from '@/app/page'; // Ajusta esta ruta si es necesaria
import '@testing-library/jest-dom';

// Mock de los componentes importados para aislar el test de la página
jest.mock('@/components/video-presentation', () => ({
    VideoPresentation: () => <div data-testid="video-presentation">Video Mocked</div>,
}));

jest.mock('@/components/animatedButton', () => ({
    AnimatedButton: ({ children }) => <button data-testid="animated-button">{children}</button>,
}));

jest.mock('@/components/our-services', () => ({
    BentoDemo: () => <div data-testid="bento-demo">Services Mocked</div>,
}));

jest.mock('@/components/animatedButton2', () => ({
    ShimmerButtonDemo: () => <div data-testid="shimmer-button">Shimmer Button Mocked</div>,
}));

jest.mock('@/components/magicCard', () => ({
    MagicCardDemo: () => <div data-testid="magic-card">Magic Card Mocked</div>,
}));

jest.mock('@/components/rainbowButton', () => ({
    RainbowButtonDemo: ({ children }) => <button data-testid="rainbow-button">{children}</button>,
}));

jest.mock('@/components/dialogButton', () => ({
    DialogNewsletter: () => <div data-testid="dialog-newsletter">Newsletter Dialog Mocked</div>,
}));

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }) => <a href={href}>{children}</a>,
}));

jest.mock('lucide-react', () => ({
    ArrowRight: () => <div data-testid="arrow-right-icon" />,
}));

jest.mock('@/components/ui/button', () => ({
    Button: ({ children, variant, size, className }) => (
        <button className={className} data-variant={variant} data-size={size} data-testid="main-cta-button">
            {children}
        </button>
    ),
}));

describe('Landing Page', () => {
    beforeEach(() => {
        render(<Page />);
    });

    it('renders the brand name', () => {
        expect(screen.getByText('FuturPrive')).toBeInTheDocument();
    });

    it('renders the main heading with gradient text', () => {
        expect(screen.getByText(/Soluciones IA personalizadas/i)).toBeInTheDocument();
        expect(screen.getByText(/Beneficio/i)).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
        expect(screen.getByText(/¿Listo para impulsar tu proyecto con tecnología\?/i)).toBeInTheDocument();
    });

    it('renders the CTA button', () => {
        // Usamos el data-testid para identificar de forma única el botón CTA principal
        const mainButton = screen.getByTestId('main-cta-button');
        expect(mainButton).toBeInTheDocument();
        expect(mainButton).toHaveTextContent(/Agenda tu Consultoría Gratuita Ahora/i);
        expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
    });

    it('renders all main components', () => {
        expect(screen.getByTestId('dialog-newsletter')).toBeInTheDocument();
        expect(screen.getByTestId('video-presentation')).toBeInTheDocument();
        // Solo hay que verificar que al menos un botón animado existe
        expect(screen.getAllByTestId('animated-button')[0]).toBeInTheDocument();
        expect(screen.getByTestId('bento-demo')).toBeInTheDocument();
        expect(screen.getByTestId('magic-card')).toBeInTheDocument();
        expect(screen.getByTestId('rainbow-button')).toBeInTheDocument();
    });

    it('renders the services section with correct title', () => {
        expect(screen.getByText('Nuestros Servicios')).toBeInTheDocument();
    });

    it('renders the process section with correct title', () => {
        // Buscar "Soluciones a medida" y "en 3 pasos" por separado
        const headingElement = screen.getByText(/Soluciones a medida/i);
        expect(headingElement).toBeInTheDocument();
        expect(screen.getByText(/en 3 pasos/i)).toBeInTheDocument();
    });
});
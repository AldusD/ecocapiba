import { GlobalStyle, NotFound, Number,HomeButton } from "./styles";

export default function NotFoundPage() {
    return (
        <>
            <GlobalStyle />
            
            <NotFound>
                <div className="notfound">
                    <Number>
                        <h3>Oops! Página não encontrada</h3>
                        <h1>
                            <span>4</span><span>0</span><span>4</span>
                        </h1>
                    </Number>
                    <h2>Sentimos muito, mas a pagína buscada não foi encontrada</h2>
                    <HomeButton>
                        <a href="/home">Voltar para Tela Inicial</a>
                        </HomeButton>
                </div>
            </NotFound>
        </>
    );
}
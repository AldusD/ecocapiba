/* eslint-disable react/no-unescaped-entities */
import {
  MainHeader,
  HeroSection,
  MissionSection,
  ChallengeSection,
  ChallengeCard,
  ChallengeList,
  SolutionSection,
  FeatureList,
  TeamSection,
  TeamList,
  ContentBlock,
  SectionPreTitle,
  SolutionIntro,
  Container,
} from "./styles";

export default function AboutUsPage(){
    return (
        <>
            <MainHeader>
                <div className="logo-area">
                    <h1>EcoCapiba</h1>
                </div>
                <nav>
                    <a href="/home">Home</a>
                    <a href="/" className="active">Sobre Nós</a>
                </nav>
            </MainHeader>

            <Container>
                <HeroSection>
                    <h1 className="main-title">Transformando Lixo em Moedas, Atitude em Futuro</h1>
                    <p className="hero-slogan">"Seu lixo vale moedas. Sua atitude vale o futuro."</p>
                </HeroSection>

                <MissionSection>
                    <ContentBlock>
                        <SectionPreTitle>A Visão</SectionPreTitle>
                        <h2>O Coração do EcoCapiba</h2>
                        <p>O EcoCapiba nasce do desejo de inovar a sustentabilidade urbana. Nosso objetivo principal é desenvolver um sistema de recompensas e níveis que incentive diretamente atividades cidadãs de reciclagem e coleta seletiva.</p>
                        <p>Permitimos que os usuários acumulem a moeda virtual <strong>Capibas</strong> como uma recompensa tangível por aprender, praticar e divulgar práticas de descarte correto, transformando uma responsabilidade cívica em uma atividade gratificante.</p>
                    </ContentBlock>
                </MissionSection>

                <ChallengeSection>
                    <ChallengeCard>
                        <SectionPreTitle>O Desafio</SectionPreTitle>
                        <h2>O que Viemos Resolver?</h2>
                        
                        <ChallengeList>
                            <article>
                                <h3>Baixa Adesão à Reciclagem</h3>
                                <p>Atacamos o pouco engajamento da população, introduzindo um sistema de incentivos e recompensas (Capibas e XP), que transforma o ato de reciclar em uma atividade interativa por meio da gamificação.</p>
                            </article>
                            <article>
                                <h3>Falta de Conhecimento</h3>
                                <p>Por meio de funcionalidades como os <strong>Quizzes Educativos</strong>, o aplicativo se propõe a informar e educar os usuários, garantindo que a prática da reciclagem seja feita de maneira eficaz e consciente.</p>
                            </article>
                        </ChallengeList>
                    </ChallengeCard>
                </ChallengeSection>

                <SolutionSection>
                    <ContentBlock className="wide-content">
                        <SectionPreTitle>O Caminho</SectionPreTitle>
                        <h2>Como Funciona a Recompensa?</h2>
                        <SolutionIntro>A moeda Capibas é o nosso incentivo à ação. Ela é distribuída através de três pilares de engajamento:</SolutionIntro>
                        
                        <FeatureList>
                            <li><strong>Quizzes Educativos:</strong> Receba Capibas e XP ao aprimorar seus conhecimentos sobre descarte correto.</li>
                            <li><strong>Reciclagem em Ecoestações:</strong> Registre sua entrega em pontos de coleta via QR Code e acumule Capibas na hora.</li>
                            <li><strong>Compartilhamento Social:</strong> Convide amigos para se juntarem ao EcoCapiba e ganhe Capibas extras por cadastro.</li>
                        </FeatureList>
                    </ContentBlock>
                </SolutionSection>

                <TeamSection>
                    <ContentBlock>
                        <SectionPreTitle>Nossa Força</SectionPreTitle>
                        <h2>Quem Está por Trás?</h2>
                        <p>Uma equipe dedicada de desenvolvimento está construindo o EcoCapiba, composta por alunos de Sistemas de Informação do 2 período de 2025, sob a tutela do docente Kiev Gama e em parceria com a Prefeitura do Recife.</p>
                        <TeamList>
                            <li>Gabriel Nóbrega</li>
                            <li>Aldus Daniel</li>
                            <li>Igor Soares</li>
                            <li>Helington Wilamy</li>
                            <li>Luis Miguel</li>
                            <li>João Vitor Lins</li>
                            <li>João Vitor Valentim</li>
                        </TeamList>
                    </ContentBlock>
                </TeamSection>

            </Container>

        </>
    )
}
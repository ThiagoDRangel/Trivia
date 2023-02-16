import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('testa a pagina de feedback', () => {
    it('Verificando a renderização do  feedback na tela', async () => {
        const initialState = {
            player: {
                name: "Matheus Quintanilha",
                assertions: 0,
                score: 0,
                gravatarEmail: "49fac01b8d2332eb41e7d19b40237473",
            },
        };
    const { history } = renderWithRouterAndRedux(<App />, { ...initialState });
    act(() => (
        history.push('/feedback')
    ))
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
    const name = await screen.findByText(/Matheus Quintanilha/i)
    const feedbackImg = await screen.findByRole('img', { name: /gravatar/i });
    const feedbackText = await screen.findByRole('heading', { name: /could be better\.\.\./i })
    const feedbackScore = await screen.findByTestId('feedback-total-score');
    const feedbackAssertions = await screen.findByTestId('feedback-total-question');
    const feedbackBtn = await screen.findByRole('button', { name: /play again/i });
    const rankingBtn = await screen.findByRole('button', { name: /ranking/i });
    expect(feedbackImg).toBeInTheDocument();
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackScore).toBeInTheDocument();
    expect(feedbackAssertions).toBeInTheDocument();
    expect(feedbackBtn).toBeInTheDocument();
    expect(rankingBtn).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(feedbackImg).toHaveAttribute('src', 'https://www.gravatar.com/avatar/https://en.gravatar.com/userimage/231704904/49fac01b8d2332eb41e7d19b40237473');
    expect(feedbackScore).toHaveTextContent('0');
    expect(feedbackAssertions).toHaveTextContent('0');
    });
    it('Verifica se quando com valor de acertos mais ou igual a 3 a mensagem muda', async () => {
        const initialState = {
            player: {
                name: "Matheus Quintanilha",
                assertions: 3,
                score: 100,
                gravatarEmail: "49fac01b8d2332eb41e7d19b40237473",
            },
        };
    const { history } = renderWithRouterAndRedux(<App />, { ...initialState });
    act(() => (
        history.push('/feedback')
    ))
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
    const feedbackText = await screen.findByRole('heading', { name: /Well Done!/i })
    expect(feedbackText).toBeInTheDocument();
    const score = await screen.findByTestId('feedback-total-score');
    expect(score).toHaveTextContent('100');
    const assertions = await screen.findByTestId('feedback-total-question');
    expect(assertions).toHaveTextContent('3');
    });
   it('Verifica se quando clicar no botao de playAgain redireciona para a pagina de login', async () => {
        const initialState = {
            player: {
                name: "Matheus Quintanilha",
                assertions: 5,
                score: 3,
                gravatarEmail: "49fac01b8d2332eb41e7d19b40237473",
            },
        };
    const { history, store } = renderWithRouterAndRedux(<App />, { ...initialState });
    act(() => (
        history.push('/feedback')
    ))
    const playAgain = await screen.getByTestId('btn-play-again');
    expect(store.getState().player).toEqual({
        name: "Matheus Quintanilha",
        assertions: 5,
        score: 3,
        gravatarEmail: "49fac01b8d2332eb41e7d19b40237473",
    });
    userEvent.click(playAgain);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(store.getState().player).toEqual({
        name: "Matheus Quintanilha",
        assertions: 0,
        score: 0,
        gravatarEmail: "49fac01b8d2332eb41e7d19b40237473",
   });
   });
   it('Verifica se ao clicar em ranking redireciona para a tela de ranking e limpa os valores do state', async () => {
        const initialState = {
            player: {
                name: "Matheus Quintanilha",
                assertions: 5,
                score: 3,
                gravatarEmail: "49fac01b8d2332eb41e7d19b40237473",
            },
        };
    const { history, store } = renderWithRouterAndRedux(<App />, { ...initialState });
    act(() => (
        history.push('/feedback')
    ))
    const rankingBtn = await screen.findByRole('button', { name: /ranking/i });
    expect(store.getState().player).toEqual({
        name: "Matheus Quintanilha",
        assertions: 5,
        score: 3,
        gravatarEmail: "49fac01b8d2332eb41e7d19b40237473",
    });
    userEvent.click(rankingBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
    expect(store.getState().player).toEqual({
        name: "Matheus Quintanilha",
        assertions: 0,
        score: 0,
        gravatarEmail: "49fac01b8d2332eb41e7d19b40237473",
   });
   });
});
import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import {screen, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("Verificar a página de Login", () => {
  it("Verificar se o botão de jogar esta desabilitado", () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByTestId('btn-play');
    expect(btn).toBeDisabled();
    const inputName =  screen.getByTestId("input-player-name");
    userEvent.type(inputName, 'Teste');
    expect(btn).toBeDisabled();
    const inputEmail = screen.getByTestId("input-gravatar-email");
    serEvent.type(inputEmail, 'teste@teste.com');
    expect(button).toBeEnabled();
  });

  it("Verifica a validação do botão Settings", () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const btn = screen.getByTestId('btn-settings');
    userEvent.click(btn);
    const {pathname} = history.location;
    expect(pathname).toBe('/settings');
  })

  it('Verifica o botao Play', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const btn = screen.getByTestId('btn-play');
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, 'Teste');
    userEvent.type(inputEmail, 'teste@teste.com');

    userEvent.click(btn);

    await waitForElementToBeRemoved(() => screen.getByTestId('btn-play'));

    const {pathname} = history.location;
    expect(pathname).toBe('/game');
  })
})
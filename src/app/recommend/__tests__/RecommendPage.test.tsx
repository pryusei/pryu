import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendPage from '../page';

beforeEach(() => {
  fetch.resetMocks();
});

describe('RecommendPage', () => {
  it('renders the input and button', () => {
    render(<RecommendPage />);
    expect(screen.getByPlaceholderText('鍛えたい部位を入力 (例: 胸, 背中)')).toBeInTheDocument();
    expect(screen.getByText('AI に提案してもらう')).toBeInTheDocument();
  });

  it('displays suggestions when the button is clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify({ suggestions: 'ベンチプレス, ダンベルフライ' }));

    render(<RecommendPage />);
    const input = screen.getByPlaceholderText('鍛えたい部位を入力 (例: 胸, 背中)');
    const button = screen.getByText('AI に提案してもらう');

    fireEvent.change(input, { target: { value: '胸' } });
    fireEvent.click(button);

    expect(await screen.findByText('提案された種目')).toBeInTheDocument();
  });
});
import * as fs from 'fs';
import { ConnectedShapes } from '../connectedShapes';

jest.mock('fs');

describe('ConnectedShapesCounter', () => {
  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockClear();
  });

  test('counts connected shapes correctly for a small grid', () => {
    const mockFileContent = 
      '0110\n' +
      '0100\n' +
      '0010\n' +
      '0011';
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const counter = new ConnectedShapes('mock_file.txt');
    expect(counter.countConnectedShapes()).toBe(2);
  });

  test('counts connected shapes correctly for a larger grid', () => {
    const mockFileContent = 
      '001010\n' +
      '011011\n' +
      '001000\n' +
      '001001\n' +
      '000000\n' +
      '000000';
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const counter = new ConnectedShapes('mock_file.txt');
    expect(counter.countConnectedShapes()).toBe(3);
  });

  test('handles an empty grid', () => {
    const mockFileContent = '';
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const counter = new ConnectedShapes('mock_file.txt');
    expect(counter.countConnectedShapes()).toBe(0);
  });

  test('handles a grid with no connected shapes', () => {
    const mockFileContent = 
      '010\n' +
      '101\n' +
      '010';
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const counter = new ConnectedShapes('mock_file.txt');
    expect(counter.countConnectedShapes()).toBe(4);
  });
});
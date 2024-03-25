import chess
import random

class ChessAI:
    ScoreMap = {'K': 50, 'Q': 9, 'R': 5, 'N': 3, 'B': 3, 'P': 1}

    def __init__(self):
        pass

    def scorePiece(self, board):
        score = 0
        Size = len(board)  # Assuming Size is predefined
        for row in range(Size):
            for col in range(Size):
                piece = board[row][col]
                if piece is not None:
                    scoreP = 1 if piece[0] == 'W' else -1
                    score += self.ScoreMap.get(piece[-1]) * scoreP
        return score

    def minimaxRoot(self, depth, game, isMaximisingPlayer):
        newGameMoves = list(game.legal_moves)
        bestMove = -9999
        bestMoveFound = None
        for newGameMove in newGameMoves:
            game.push(newGameMove)
            value = self.minimax(depth - 1, game, -10000, 10000, not isMaximisingPlayer)
            game.pop()
            if value >= bestMove:
                bestMove = value
                bestMoveFound = newGameMove
        return bestMoveFound

    def minimax(self, depth, game, alpha, beta, isMaximisingPlayer):
        if depth == 0:
            return self.scorePiece(game.board().copy())
        newGameMoves = list(game.legal_moves)
        if isMaximisingPlayer:
            bestMove = -9999
            for newGameMove in newGameMoves:
                game.push(newGameMove)
                bestMove = max(bestMove, self.minimax(depth - 1, game, alpha, beta, not isMaximisingPlayer))
                game.pop()
                alpha = max(alpha, bestMove)
                if beta <= alpha:
                    return bestMove
            return bestMove
        else:
            bestMove = 9999
            for newGameMove in newGameMoves:
                game.push(newGameMove)
                bestMove = min(bestMove, self.minimax(depth - 1, game, alpha, beta, not isMaximisingPlayer))
                game.pop()
                beta = min(beta, bestMove)
                if beta <= alpha:
                    return bestMove
            return bestMove

    def calculateBestMove(self, game):
        depth = 3
        newGameMoves = list(game.legal_moves)
        random.shuffle(newGameMoves)
        bestMove = None
        bestValue = -9999
        for newGameMove in newGameMoves:
            game.push(newGameMove)
            boardValue = self.minimax(depth - 1, game, -10000, 10000, False)
            game.pop()
            if boardValue >= bestValue:
                bestValue = boardValue
                bestMove = newGameMove
        return bestMove
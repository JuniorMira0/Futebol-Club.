import * as express from 'express';
import * as cors from 'cors';
import RouterLogin from './routers/Login.router';
import RouteTeams from './routers/Teams.router';
import RouterMatches from './routers/Matches.router';
import LeaderboardRouter from './routers/Leaderboard.router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(accessControl);

    const path = '/';

    this.app.use(
      path,
      new RouterLogin().router,
      new RouteTeams().router,
      new RouterMatches().router,
      new LeaderboardRouter().router,
    );
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT} ;D`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

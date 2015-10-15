import heroesController from '../controllers/heroes.controller';
export default (app) => {
  app.route('/api/v1/heroes')
    .post(heroesController.create)
    .get(heroesController.retrieveAll);
  app.route('/api/v1/heroes/:heroId')
    .put(heroesController.update)
    .delete(heroesController.remove)
    .get(heroesController.retrieve);
  app.param('heroId', heroesController.findById);
}

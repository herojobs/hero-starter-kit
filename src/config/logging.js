import bunyan from 'bunyan';

export default bunyan.createLogger({
  name: 'hero-starter-kit',
  serializers: { req: bunyan.stdSerializers.req }
});

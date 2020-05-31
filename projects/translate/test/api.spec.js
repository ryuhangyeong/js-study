const expect = require('chai').expect;
const { getTranlateResult } = require('../api');
const { getErrorCode } = require('../utils');
const { defaultQuery } = require('./utils');

const erroCode = getErrorCode();

describe('#Api', () => {
     describe('getTranlateResult', () => {
          beforeEach(() => { this.query = Object.assign({}, defaultQuery); });
          afterEach(() => { this.query = Object.assign({}, defaultQuery); });

         	it('정상 호출', done => {
               getTranlateResult(this.query)
                    .then((res) => {
                         expect(JSON.parse(res).message.result.translatedText).to.equal('Good to see you.');
                         done();
                    }).catch(done);
          });

          it('source 파라미터가 필요합니다.', done => {
               delete this.query.source;
               getTranlateResult(this.query)
                    .catch((err) => {
                         expect(JSON.parse(err).errorCode).to.equal(erroCode['N2MT01'].code);
                         done();
                    });
          });

          it('지원하지 않는 source 언어입니다.', done => {
               this.query.source = 'unsupport';
               getTranlateResult(this.query)
                    .catch((err) => {
                         expect(JSON.parse(err).errorCode).to.equal(erroCode['N2MT02'].code);
                         done();
                    });
          });

          it('target 파라미터가 필요합니다.', done => {
               delete this.query.target;
                getTranlateResult(this.query)
                    .catch((err) => {
                         expect(JSON.parse(err).errorCode).to.equal(erroCode['N2MT03'].code);
                         done();
                    });
          });

          it('지원하지 않는 target 언어입니다.', done => {
               this.query.target = 'unsupport';
               getTranlateResult(this.query)
                    .catch((err) => {
                         expect(JSON.parse(err).errorCode).to.equal(erroCode['N2MT04'].code);
                         done();
                    });
          });

          it('source와 target이 동일합니다.', done => {
               this.query.source = 'ko';
               this.query.target = 'ko';
               getTranlateResult(this.query)
                    .catch((err) => {
                         expect(JSON.parse(err).errorCode).to.equal(erroCode['N2MT05'].code);
                         done();
                    });
          });

          it('text 파라미터가 필요합니다.', done => {
               delete this.query.text;
               getTranlateResult(this.query)
                    .catch((err) => {
                         expect(JSON.parse(err).errorCode).to.equal(erroCode['N2MT07'].code);
                         done();
                    });
          });  
     });
});
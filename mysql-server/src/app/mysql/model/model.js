/** 시퀼라이저로 table 생성하기
모델(테이블) 이름 설정
첫번째 파라미터로, tutorial이라고 정의해도 tutorials라고 생성됨.tableName옵션을 설정하면 정의한 값으로 생성가능
*/
module.exports = (sequelizeConfig, Sequelize) => {
    // Set Model
    const Tutorial = sequelizeConfig.define('tutorial',
        {
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            published: {
                type: Sequelize.BOOLEAN
            }
        }
    );

    return Tutorial;
};
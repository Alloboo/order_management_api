# recruitment_task_twice

(주)두번째 백엔드 개발자 채용 과제

<br>

## 과제 안내

https://bit.ly/3S7MoEl

<br>
<br>

## 1. 사용 기술

#### 환경

  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>

#### 언어

  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>

#### 프레임워크/라이브러리

<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/typeorm-262627?style=for-the-badge&logo=typeorm&logoColor=white"/>

#### 데이터베이스

<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>

<br>
<br>

## 2. 데이터베이스 설계

### ERD

![스크린샷 2024-01-15 213732](https://github.com/Alloboo/recruitment_task_twice/assets/122436708/11a058e6-3662-4f4d-921a-fced9557e03d)

<br>

### DDL(migration으로 대체)

```javascript
import { ConnectionOptions, MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1705682562235 implements MigrationInterface {
  name = "CreateUserTable1705682562235";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`customer_id\` int NOT NULL AUTO_INCREMENT, \`customer_name\` varchar(200) NOT NULL, \`customer_grade\` varchar(50) NOT NULL, PRIMARY KEY (\`customer_id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`order_history\` (\`order_id\` int NOT NULL AUTO_INCREMENT, \`customer_id\` int NOT NULL, \`order_date\` date NOT NULL, \`order_type\` enum ('order', 'refund') NOT NULL, \`order_amount\` decimal(10,2) NOT NULL, PRIMARY KEY (\`order_id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ALTER COLUMN \`customer_name\` SET DEFAULT '기본이름'`
    );
    await queryRunner.query(
      `ALTER TABLE \`order_history\` ADD CONSTRAINT \`FK_7ec8834ccf79631a801ab032f94\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`customer_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_history\` DROP FOREIGN KEY \`FK_7ec8834ccf79631a801ab032f94\``
    );
    await queryRunner.query(`DROP TABLE \`order_history\``);
    await queryRunner.query(`DROP TABLE \`customer\``);
  }
}
```

<br>
<br>

## 3. API 설계

### 구현 API

1. 고객정보 및 주문내역정보 업로드 API: 엑셀 파일을 읽어서 Database에 데이터를 등록한다.
2. 월별 매출 통계 API: 월별 매출 합계 데이터를 반환한다.
3. 주문 목록 조회 API: 주문 목록을 조회하는 페이지에서 API 요청 시 조건에 맞게(페이지네이션, 필터) 주문 데이터를 반환한다.

<br>

### API 명세
![스크린샷 2024-01-20 130529](https://github.com/Alloboo/recruitment_task_twice/assets/122436708/91759130-6894-477a-a1be-66b4576769dd)



<br>


### 테스트 케이스
- [ ] 고객 정보 및 주문 내역 db 저장
- /api/uploads
- req.body.file
- [ ] 월별 매출 통계
- /api/monthlySales
- [ ] 전체 주문 목록 조회
- /api/orderList
- [ ] 특정 날짜 범위 주문 조회
- /api/orderList?startDate=2023-01-01&endDate=2023-01-31
- [ ] 주문 타입별 주문 조회
- /api/orderList?orderType=2
- [ ] 고객별 주문 조회
- /api/orderList?customerId=70
- [ ] 날짜 범위/주문 타입/고객 주문 조회
- /api/orderList?startDate=2023-01-01&endDate=2023-02-28&orderType=2&customerId=70




<br>
<br>

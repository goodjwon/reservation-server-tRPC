## 스크립트
tRPC 로 예약 서비스를 만드는 프로젝트로 DDD를 기본으로 헥사고날아키텍처를 지향하고 요청 전문으로는 아래처럼 요청 json 을 사용하고 spring jpa 처럼 ORM 프래임워크를 사용해서 RDB에 데이터를 저장 했으면 좋겠어.
요청데이터는 다음과 같다.
```json
{
  "name": "홍길동",
  "phoneNumber": "010-1234-5678",
  "email": "example@abc.com",
  "checkIn": "2022-01-01",
  "checkOut": "2022-01-02",
  "roomType": "Single",
  "resortCode": "0010A",
  "adults": 2,
  "children": 1,
  "totalPrice": 100000,
  "pricePerDay": 50000, 
  "reservationStatus": "REQUEST"
}
````
응답으로는 

```json
{
  "id": 1,
  "reservationNumber": "202201010001",
  "name": "홍길동",
  "phoneNumber": "010-1234-5678",
  "email": "example@abc.com",
  "checkIn": "2022-01-01",
  "checkOut": "2022-01-02",
  "roomType": "Single",
  "resortCode": "0010A",
  "adults": 2,
  "children": 1,
  "totalPrice": 100000,
  "pricePerDay": 50000,
  "reservationStatus": "CONFIRMED"
}
```
왔으면 좋겠네.. 

각 파일의 트리와 역활을 정의 해 주고 순서는 
package.json -> tsconfig.json -> serverless.yml 등의 설정 부분과
도메인 -> DTO -> 리포지토리 ->  서비스 -> 어댑터 -> 핸들러 -> 라우터 -> 클라이언트 순으로 설명을 해 주면 좋겠어.
그리고 mkdir 등으로 현재 경로 기준에서 디렉터리를 만들어 주는 스크립트도 준비 해줘.

pnpm을 사용 할 거고 각 라이브러리는 호환성에 유의 해주고 설치가 질 되도록 준비 해줘.
각 층을 테스트 할 수 있는 슬라이스테스트 케이스와 통합테스트 케이스를 작성해 주면 좋겠어.
테스트 케이스는 jest 를 사용하고 테스트 커버리지는 90% 이상이면 좋겠어.
서버리스 프레임워크를 사용해서 AWS Lambda 와 API Gateway 를 사용해서 배포하면 좋겠어.
그리고 클라이언트와 서버 프로젝트는 각각 구성 했으면 좋겠어.

## 파일 설명
- app/handler/ReservationHandler.ts: API 핸들러를 정의하는 파일로, 클라이언트 요청을 처리합니다.
- app/trpc.ts: tRPC 라우터를 설정하는 파일로, 애플리케이션의 엔드포인트를 정의합니다.
- app/trpcRouter.spec.ts: 슬라이스 테스트를 정의하는 파일로, tRPC 라우터를 테스트합니다.
- domain/entity/Reservation.ts: 도메인 엔티티를 정의하는 파일로, 예약 엔티티를 정의합니다.
- domain/port/ReservationRepository.ts: 도메인 레이어 인터페이스를 정의하는 파일로, 리포지토리 인터페이스를 정의합니다.
- domain/service/ReservationService.ts: 도메인 서비스를 정의하는 파일로, 비즈니스 로직을 처리합니다.
- infra/adapter/TypeORMReservationRepository.ts: TypeORM을 사용하여 리포지토리 인터페이스를 구현하는 파일입니다.
- infra/data-source.ts: TypeORM 데이터 소스를 설정하는 파일입니다.
infra/data-source.mock.ts: 테스트를 위해 데이터 소스를 모킹하는 파일입니다.
- client.ts: 클라이언트 코드를 정의하는 파일로, API를 호출하여 동작을 테스트합니다.
- jest.config.js: Jest 설정 파일입니다.
package.json: 프로젝트 종속성과 스크립트를 정의하는 파일입니다.
- serverless.yml: 서버리스 프레임워크 설정 파일로, AWS Lambda와 API Gateway 설정을 정의합니다.
- tsconfig.json: TypeScript 설정 파일입니다.
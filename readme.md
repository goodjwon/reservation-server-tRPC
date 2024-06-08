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
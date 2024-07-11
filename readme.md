## 스크립트
tRPC 로 예약 서비스를 만드는 프로젝트로 DDD를 기본으로 요청 전문으로는 아래처럼 요청 json 을 사용하고 spring jpa 처럼 ORM 프래임워크를 사용해서 RDB에 데이터를 저장 했으면 좋겠어.
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
응답데이터는 아래와 같다.

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


각 파일의 트리와 역활을 정의 해 주고 순서는 
package.json -> tsconfig.json -> serverless.yml 등의 설정 부분과
도메인 -> DTO -> 리포지토리 ->  서비스 -> 어댑터 -> 핸들러 -> 라우터 -> 클라이언트 순으로 설명을 해 주면 좋겠어.
그리고 mkdir 등으로 현재 경로 기준에서 디렉터리를 만들어 주는 스크립트도 준비 해줘.

server, client 가 같이 있는 형식으로 각 각 package.json이 있게 설정 해주고. 

```
server-src
 --application
 --domain
 --infrastructure
 --interface
package.json
serverless.yml
tsconfig.json 
```

위와 같이 통상적인 경로를 가지고 있었으면 좋겠어. 
db는 mysql을 사용 할 하고
dto 와 도메인의 맵핑 등 맵핑하는 작업은 한 곳에서만 하고 필요할때마다 가져다 쓰는 형식이 좋겠어. 
pnpm을 사용 할 거고 각 라이브러리는 호환성에 유의 해주고 설치가 질 되도록 준비 해줘.
각 층을 테스트 할 수 있는 슬라이스테스트 케이스와 통합테스트 케이스를 작성해 주면 좋겠어.
테스트 케이스는 jest 를 사용하고 테스트 커버리지는 90% 이상이면 좋겠어.
서버리스 프레임워크를 사용해서 AWS Lambda 와 API Gateway 를 사용해서 배포하면 좋겠어.
그리고 클라이언트와 서버 프로젝트는 각각 구성 했으면 좋겠어.

서버 구동 및 단위 테스트 실행하는 방법 및 각 생성되는 파일 설명도 부탁해.

서버 구동 커밋버전 77cdc5956787ae2a1f95fcba1958820525ae7a69

```


server >  git:(main) curl -X POST http://localhost:3000/trpc/createReservation \
-H "Content-Type: application/json" \
-d '{
  "name": "홍길동",
  "phoneNumber": "010-1234-5678",
  "email": "example@abc.com",
  "checkIn": "2023-07-01",
  "checkOut": "2023-07-03",
  "roomType": "Single",
  "resortCode": "0010A",
  "adults": 2,
  "children": 1,
  "totalPrice": 100000,
  "pricePerDay": 50000,
  "reservationStatus": "REQUEST"
}'

```
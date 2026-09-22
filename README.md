# 스마트 중고차 수출 ERP 시스템
## 링크 URL [https://erp-task-seven.vercel.app/](https://erp-task-seven.vercel.app/)

## 핵심 업무 처리 플로우

### 1. VIN 입력을 통한 압류·도난 검증
* **1-1. 정상 차량**: 즉시 다음 단계(세무 증빙 검증)로 진행.
<img width="1217" height="65" alt="image" src="https://github.com/user-attachments/assets/7d848214-7a75-4022-b859-cb261f0c3fc4" />
<br><br>

* **1-2. 압류·도난 차량**: 즉시 선적 대상에서 제외 및 경고.
<img width="555" height="330" alt="image" src="https://github.com/user-attachments/assets/09a69f6c-113e-479e-aa44-6d766d90ff43" />
<img width="1217" height="60" alt="image" src="https://github.com/user-attachments/assets/8120a837-57e3-4f54-bbcd-a25d73326eb3" />
<br><br>

### 2. 선적 승인 및 조건부 선적 (세무 증빙 체크)
> 1단계를 통과한 정상 차량들에 대해 진행.
* **2-1. 세무 증빙 완비 차량**: 선적 후 정상 종결 처리.
<img width="1217" height="60" alt="image" src="https://github.com/user-attachments/assets/384104bd-4b0c-42a3-8b56-711444df037b" />
<br><br>

* **2-2. 세무 증빙 미비 차량**: 시세 하락 방지를 위해 일단 선적을 허용하되, 사후 세무 증빙 제출 기한(7일)을 부여.
<img width="1212" height="60" alt="image" src="https://github.com/user-attachments/assets/e7098958-9cd8-4621-86ec-a04e7b47637a" />
<br><br>

### 3. 사후 관리
> 세무 증빙 미비(조건부 선적) 차량들에 대해 진행.
* **3-1. 기한 내 사후 증빙 제출 완료**: 정상 처리 및 종결.
<img width="800" height="44" alt="_2026_09_22_21_50_22_887-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/be280b6d-43c4-4175-8e07-fed7311405a6" />
<br><br>

* **3-2. 기한 내 사후 증빙 미제출**: 해당 차량 선적을 승인한 직원 징계 및 패널티.
<img width="1221" height="60" alt="image" src="https://github.com/user-attachments/assets/96119429-dd32-46bf-a20b-90193a2fc83b" />
<br><br>

* 제출 기한이 3일 이하또는 제출 기한이 초과되었을 경우 상단 배너로 경고표시.
* 상단 배너의 모아보기 버튼으로 마감 임박, 기한 초과된 항목들을 바로 필터링해서 확인 가능.
<img width="1265" height="485" alt="image" src="https://github.com/user-attachments/assets/09450f63-411d-4c7c-aca8-1a1a0ec64a4c" />


### 필터링을 통해 선적 여부, 사후 세무 증빙만 필요한 차량 등을 확인가능
* 선적 승인, 조건부 선적만 확인
<img width="1226" height="535" alt="image" src="https://github.com/user-attachments/assets/bc1ba428-94cc-4194-a83b-044ac439c62a" />
<br><br>

* 사후 증빙 제출이 필요한 항목만 확인
<img width="1225" height="331" alt="image" src="https://github.com/user-attachments/assets/0eb5ba4d-d4ea-4cc9-a25b-e28e564552fb" />
<br><br>

* 사후 증빙 제출기한 순서로 정렬하는 기능 구현
<img width="1230" height="601" alt="image" src="https://github.com/user-attachments/assets/ac8baeb2-a92f-4dba-ba67-89c3ae029efd" />

* 테이블의 해당 항목 클릭시 상세보기 모달 구현
<img width="573" height="478" alt="image" src="https://github.com/user-attachments/assets/5aa9cece-131c-455e-81aa-7ea02154e2fa" />





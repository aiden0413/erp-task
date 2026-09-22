# 스마트 중고차 수출 ERP 시스템
## 링크 URL [https://erp-task-seven.vercel.app/](https://erp-task-seven.vercel.app/)

## 핵심 업무 처리 플로우

### 1. VIN 입력을 통한 압류·도난 검증
* **1-1. 정상 차량**: 즉시 다음 단계(세무 증빙 검증)로 진행.
<img width="1232" height="62" alt="image" src="https://github.com/user-attachments/assets/360ae129-3f79-4f91-a517-691b0a732431" />
<br><br>

* **1-2. 압류·도난 차량**: 즉시 선적 대상에서 제외 및 경고.
<img width="1217" height="61" alt="image" src="https://github.com/user-attachments/assets/cee029c1-263f-4e5a-a401-e31adaa9167a" />
<br><br>

### 2. 선적 승인 및 조건부 선적 (세무 증빙 체크)
> 1단계를 통과한 정상 차량들에 대해 진행.
* **2-1. 세무 증빙 완비 차량**: 선적 후 정상 종결 처리.
<img width="1213" height="62" alt="image" src="https://github.com/user-attachments/assets/fbb8d01d-a026-47d6-8ec8-89e4c99dc0eb" />
<br><br>

* **2-2. 세무 증빙 미비 차량**: 시세 하락 방지를 위해 일단 선적을 허용하되, 사후 세무 증빙 제출 기한(7일)을 부여.
<img width="1215" height="57" alt="image" src="https://github.com/user-attachments/assets/d263b1e8-74e9-48e5-b9b4-941e104ad13c" />
<br><br>

### 3. 사후 관리
> 세무 증빙 미비(조건부 선적) 차량들에 대해 진행.
* **3-1. 기한 내 사후 증빙 제출 완료**: 정상 처리 및 종결합니다.
<img width="1216" height="68" alt="녹화_2026_09_21_23_16_56_154" src="https://github.com/user-attachments/assets/522ea605-6e9d-4911-a273-683df8cfd149" />
<br><br>

* **3-2. 기한 내 사후 증빙 미제출**: 해당 차량 선적을 승인한 직원 징계 및 패널티
<img width="1220" height="62" alt="image" src="https://github.com/user-attachments/assets/4bb825c4-2f2e-4269-9a42-9379bd461925" />
<br><br><br><br>


필터링을 통해 선적 여부, 사후 세무 증빙만 필요한 차량 등을 확인가능

<img width="1235" height="531" alt="image" src="https://github.com/user-attachments/assets/d506a47d-97c2-400f-9c21-b5c9fe1ec708" />



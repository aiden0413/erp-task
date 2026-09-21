# 스마트 중고차 수출 ERP 시스템

## 핵심 업무 처리 플로우

### 1. VIN 입력을 통한 압류·도난 검증
* **1-1. 정상 차량**: 즉시 다음 단계(세무 증빙 검증)로 진행.
<img width="1232" height="62" alt="image" src="https://github.com/user-attachments/assets/360ae129-3f79-4f91-a517-691b0a732431" />

* **1-2. 압류·도난 차량**: 즉시 선적 대상에서 제외 및 경고.
<img width="1216" height="62" alt="image" src="https://github.com/user-attachments/assets/0a8c9eeb-4e2c-4ca6-a08c-423fe20137cd" />

### 2. 선적 승인 및 조건부 선적 (세무 증빙 체크)
> 1단계를 통과한 정상 차량들에 대해 진행.
* **2-1. 세무 증빙 완비 차량**: 선적 후 정상 종결 처리.
* **2-2. 세무 증빙 미비 차량**: 시세 하락 방지를 위해 일단 선적을 허용하되, 사후 세무 증빙 제출 기한(7일)을 부여.
<img width="1215" height="57" alt="image" src="https://github.com/user-attachments/assets/d263b1e8-74e9-48e5-b9b4-941e104ad13c" />

### 3. 사후 관리
> 세무 증빙 미비(조건부 선적) 차량들에 대해 진행.
* **3-1. 기한 내 사후 증빙 제출 완료**: 정상 처리 및 종결합니다.
<img width="1216" height="68" alt="녹화_2026_09_21_23_16_56_154" src="https://github.com/user-attachments/assets/522ea605-6e9d-4911-a273-683df8cfd149" />

* **3-2. 기한 내 사후 증빙 미제출**: 해당 차량 선적을 승인한 직원 징계 및 패널티

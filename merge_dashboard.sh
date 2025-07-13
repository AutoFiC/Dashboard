#!/bin/bash

# 실행 위치 확인
if [ ! -d "src/dashboard-ui" ]; then
  echo "❌ src/dashboard-ui 디렉토리가 존재하지 않습니다. 루트 위치에서 실행해주세요."
  exit 1
fi

echo "✅ 병합 시작: dashboard-ui → 메인 구조"

# 1. components 복사
if [ -d "src/dashboard-ui/src/components" ]; then
  cp -r src/dashboard-ui/src/components/* src/components/
  echo "✅ components 병합 완료"
fi

# 2. assets 복사
if [ -d "src/dashboard-ui/src/assets" ]; then
  cp -r src/dashboard-ui/src/assets/* src/assets/
  echo "✅ assets 병합 완료"
fi

# 3. public 복사
if [ -d "src/dashboard-ui/public" ]; then
  cp -r src/dashboard-ui/public/* public/
  echo "✅ public 파일 병합 완료"
fi

# 4. package.json dependency 병합
if [ -f "src/dashboard-ui/package.json" ]; then
  echo "🔄 dependencies 병합 시작..."

  jq -s '
    def merge_dependencies:
      reduce .[] as $item ({}; . * $item);

    {
      dependencies: merge_dependencies | .dependencies,
      devDependencies: merge_dependencies | .devDependencies
    } |
    .dependencies |= with_entries(select(.value != null)) |
    .devDependencies |= with_entries(select(.value != null))
  ' package.json src/dashboard-ui/package.json > tmp_merged_package.json

  mv tmp_merged_package.json package.json
  echo "✅ package.json 병합 완료"
else
  echo "⚠️ src/dashboard-ui/package.json 파일이 없습니다. dependencies 병합 생략"
fi

# 5. dashboard-ui 제거 여부 확인
read -p "🧹 src/dashboard-ui 폴더 삭제할까요? (y/N): " confirm
if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
  rm -rf src/dashboard-ui
  echo "✅ dashboard-ui 폴더 삭제 완료"
else
  echo "ℹ️ dashboard-ui 폴더는 그대로 남겨둡니다."
fi

echo "🎉 모든 병합 작업 완료!"


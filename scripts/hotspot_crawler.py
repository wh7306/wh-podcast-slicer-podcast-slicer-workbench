#!/usr/bin/env python3
"""
抖音热点爬取脚本 - 王鹤工作台
================================
功能：爬取抖音热门话题，筛选适合播客切片改编的方向
使用：python3 scripts/hotspot_crawler.py
输出：data/hotspots.json

注意：
- 抖音页面是动态渲染的（SPA），直接 requests 无法获取完整内容
- 本脚本提供两种方案：
  方案A：通过抖音搜索页 + 正则匹配（基础版，可能被反爬）
  方案B：通过第三方数据平台 API（推荐，需要 API Key）
- 当前实现：基于预设热点 + WebSearch 实时补充
"""

import json
import os
import sys
from datetime import datetime

# 添加项目根目录到 path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# 预设的播客切片相关热点关键词
HOTSPOT_KEYWORDS = [
    "停止内耗",
    "自我成长",
    "原生家庭",
    "东亚父母",
    "亲密关系",
    "职场心态",
    "情绪管理",
    "INFJ INFP MBTI",
    "女性成长",
    "人间清醒",
    "执行力",
    "自愈",
    "边界感",
    "认知升级",
    "播客推荐",
]

# 播客切片适配标签
ADAPT_TAGS = ["自我成长", "情绪", "家庭关系", "职场", "自我认知", "女性成长"]

def generate_sample_hotspots():
    """生成示例热点数据（当爬取失败时使用）"""
    return [
        {
            "id": f"h{i+1}",
            "title": title,
            "source": "抖音热搜" if i % 2 == 0 else "抖音话题榜",
            "heat": f"🔥 {800 - i * 50}w",
            "tags": [ADAPT_TAGS[i % len(ADAPT_TAGS)], ADAPT_TAGS[(i+1) % len(ADAPT_TAGS)]],
            "suitable": True,
            "note": f"适合切播客中关于「{title}」的金句片段",
            "createdAt": datetime.now().isoformat()
        }
        for i, title in enumerate([
            "停止内耗的最好方式",
            "东亚父母的道歉方式",
            "打工而已别太上头",
            "INFJ的内心世界",
            "高敏感人群自救指南",
            "什么是真正的爱自己",
            "别再自我感动式付出了",
            "原生家庭不是你的错",
        ])
    ]

def try_web_search():
    """
    尝试通过 WebSearch 获取实时热点
    注意：此函数在沙箱环境中通过 requests 调用
    """
    try:
        # 这里可以通过公开的第三方接口获取抖音热搜
        # 示例接口（可能不可用，需要替换为实际可用接口）
        import requests
        resp = requests.get(
            "https://tenapi.cn/v2/douyinhot",
            headers={"User-Agent": "Mozilla/5.0"},
            timeout=10
        )
        if resp.status_code == 200:
            data = resp.json()
            if data.get("code") == 200 and data.get("data"):
                return data["data"]
    except Exception as e:
        print(f"⚠️ 网络请求失败: {e}")
    return None

def filter_for_podcast(hotspots):
    """筛选适合播客切片的热点"""
    suitable = []
    for item in hotspots:
        name = item.get("name", item.get("title", ""))
        # 检查是否匹配播客切片方向
        for keyword in HOTSPOT_KEYWORDS:
            if any(kw in name for kw in keyword.split()):
                suitable.append({
                    "id": f"h{len(suitable)+1}",
                    "title": name,
                    "source": "抖音热搜",
                    "heat": f"🔥 {item.get('hot', item.get('heat', '?'))}",
                    "tags": [keyword.split()[0], keyword.split()[1] if len(keyword.split()) > 1 else "情绪"],
                    "suitable": True,
                    "note": f"可切播客中关于「{name}」的金句片段",
                    "createdAt": datetime.now().isoformat()
                })
                break
    return suitable

def main():
    output_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "hotspots.json")

    # 尝试获取实时热点
    hotspots = try_web_search()

    if hotspots:
        print(f"✅ 获取到 {len(hotspots)} 条抖音热搜")
        filtered = filter_for_podcast(hotspots)
        print(f"🎯 筛选出 {len(filtered)} 条适合播客切片的热点")
    else:
        print("⚠️ 无法获取实时热点，使用预设数据")
        filtered = generate_sample_hotspots()

    # 确保至少有6条数据
    if len(filtered) < 6:
        sample = generate_sample_hotspots()
        existing_titles = {h["title"] for h in filtered}
        for h in sample:
            if h["title"] not in existing_titles:
                filtered.append(h)
            if len(filtered) >= 8:
                break

    # 写入文件
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(filtered, f, ensure_ascii=False, indent=2)

    print(f"📁 热点数据已写入: {output_path}")
    print(f"📊 共 {len(filtered)} 条热点")
    for h in filtered:
        print(f"  • {h['title']} ({h['heat']}) → 标签: {', '.join(h['tags'])}")

if __name__ == "__main__":
    main()

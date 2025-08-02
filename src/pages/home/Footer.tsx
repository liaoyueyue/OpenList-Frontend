import { Anchor, HStack, VStack, Text, Box } from "@hope-ui/solid"
import { Link } from "@solidjs/router"
import { AnchorWithBase } from "~/components"
import { useT } from "~/hooks"
import { me } from "~/store"
import { UserMethods } from "~/types"
import { createSignal, onMount } from "solid-js"

export const Footer = () => {
  const t = useT()
  const [hitokoto, setHitokoto] = createSignal({
    text: "人生最大的遗憾,就是在最无能为力的时候遇到一个想要保护一生的人.",
    from: "LYY'S CLOUD",
  })

  // 获取一言数据
  const fetchHitokoto = async () => {
    try {
      const response = await fetch("https://v1.hitokoto.cn")
      const data = await response.json()
      if (data && data.hitokoto) {
        setHitokoto({
          text: data.hitokoto,
          from: data.from || "未知来源",
        })
      }
    } catch (error) {
      console.error("获取一言失败:", error)
    }
  }

  // 组件挂载时获取一言
  onMount(() => {
    fetchHitokoto()
  })

  return (
    <VStack class="footer" w="$full" py="$2">
      {/* 添加一言内容 */}
      <VStack spacing="$1" lineHeight="$normal">
        <Text as="div" textAlign="center" fontWeight="$bold" fontSize="$sm">
          <Box as="span" color="#0d6dfc" id="hitokoto">
            "{hitokoto().text}"
          </Box>
        </Text>
        <Text
          as="div"
          textAlign="right"
          fontStyle="italic"
          fontSize="$xs"
          w="$full"
          mt="-$0_5"
        >
          <Box as="small">—— {hitokoto().from}</Box>
        </Text>
      </VStack>
      {/* 修改一些链接 */}
      <HStack spacing="$1" fontSize="$sm">
        <Anchor href="mailto:lyyovo@qq.com" external>
          EMAIL
        </Anchor>
        <span>|</span>
        <Anchor href="https://liaoyueyue.cn" external>
          BLOG
        </Anchor>
        <span>|</span>
        <AnchorWithBase
          as={Link}
          href={UserMethods.is_guest(me()) ? "/@login" : "/@manage"}
        >
          {UserMethods.is_guest(me()) ? "LOGIN" : "MANAGE"}
        </AnchorWithBase>
        <span>|</span>
        <Anchor href="https://github.com/OpenListTeam/OpenList" external>
          OPENLIST
        </Anchor>
      </HStack>
    </VStack>
  )
}

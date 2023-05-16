'use client';

import { UserType } from '@/lib/types';
import {
  Card,
  Center,
  Divider,
  HoverCard,
  Progress,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import useSWR from 'swr';
import { TodoType } from '../../list/page';

/**
 * 这是一个 TypeScript React 函数，它使用授权令牌从给定的 URL 中获取数据，并返回 TodoType 对象数组的 Promise。
 * @param {RequestInfo | URL} url - `url` 参数是一个 `RequestInfo` 或 `URL` 对象，表示要从中获取数据的 URL。它可以是字符串 URL 或
 * `URL` 对象。
 * @param {string} token - `token`
 * 参数是一个表示授权令牌的字符串。它用于对用户进行身份验证并授予对服务器上受保护资源的访问权限。在这种情况下，它作为获取请求中的标头传递，以授权用户访问所请求的资源。
 * @returns `fetcher` 函数返回一个解析为 `TodoType` 对象数组的 Promise。
 */
const fetcher = async (
  url: RequestInfo | URL,
  token: string
): Promise<TodoType[]> => {
  /* 此代码向 url 参数中提供的 URL 发出提取请求，HTTP 方法指定为 HTTP_METHODS 数组的第一个元素（即 GET），并带有 Authorization 标头包含 `token`
  参数。然后使用 `await` 将响应存储在 `response` 变量中。 */
  const response = await fetch(url, {
    method: HTTP_METHODS[0],
    headers: { Authorization: token },
  });
  /* 此代码块正在检查获取请求的响应是否成功（状态代码在 200-299 之间）。如果成功，它会将响应正文作为 JSON 对象返回。如果不成功，它会抛出一个错误，并以状态文本作为消息。 */
  if (response.ok) {
    /* `return await response.json();` 正在返回一个 Promise，该 Promise 解析为从 `fetch` 请求的 JSON 响应主体解析的
    JavaScript 对象。 `await` 关键字用于等待响应完全解析后再返回结果。 */
    return await response.json();
  } else {
    /* `throw new Error(response.statusText);` 以响应的状态文本作为消息抛出错误。当响应状态码不在 200-299
    范围内时，表示请求不成功。该错误将被调用函数捕获并可以适当处理。 */
    throw new Error(response.statusText);
  }
};

/* `export default` 语句正在导出一个名为 `Program` 的默认函数组件。该组件负责呈现日常任务表，使用 useSWR 挂钩从服务器获取。该组件首先使用
useSessionStorage 挂钩从会话存储中检索用户的授权令牌。然后，它使用 useSWR 挂钩使用 fetcher
函数从服务器获取数据。如果在获取过程中出现错误，组件将返回一个空片段。如果没有数据或数据数组为空，组件将呈现一张卡片，其中包含一条消息，指示当天没有任务。否则，该组件会呈现一个表格，其中包含每个任务的任务名称、计划结束日期和进度条。进度条是根据任务的当前量和总量计算的。 */
export default function Program() {
  /* `const [值] = useSessionStorage<用户类型 | undefined>({ key: 'user' });` 正在使用 `useSessionStorage`
  挂钩来检索存储在会话存储中的键 `'user' 下的值。然后将检索到的值存储在“值”常量中。检索值的类型是 `UserType | undefined
  ，这意味着如果在会话存储中找不到该值，则它可以是 UserType 或 undefined 类型的对象。 */
  const [value] = useSessionStorage<UserType | undefined>({ key: 'user' });
  /* 此代码使用“useSWR”挂钩从服务器获取数据。该钩子有两个参数：第一个参数是一个 URL 或一个包含 URL 和标记的数组，第二个参数是一个获取数据的函数。在这种情况下，URL
  是“/api/todo/program”，令牌是从存储在会话存储中的“value”对象中检索的。如果“value”为假，则 URL 设置为“null”。 `fetcher`
  函数用于获取数据并返回解析为 `TodoType` 对象数组的 Promise。 `useSWR` 钩子返回一个具有两个属性的对象：`data` 和 `error`。 `data`
  包含获取的数据，而 `error` 包含获取期间发生的任何错误。 */
  const { data, error } = useSWR(
    value ? ['/api/todo/program', value.token] : null,
    ([input, token]) => fetcher(input, token)
  );

  /* `if (error) return <>/>;` 正在检查使用 `useSWR`
  钩子从服务器获取数据时是否有错误。如果出现错误，它会返回一个空片段，这意味着页面上不会呈现任何内容。这是一种优雅地处理错误并防止应用程序崩溃的方法。 */
  if (error) return <></>;

  /* 此代码块正在检查是否没有数据或数据数组是否为空。如果这些条件中的任何一个为真，它将返回一张卡片，其中包含一条消息，表明当天没有任务。 */
  if (!data || data.length === 0) {
    /* 此代码块返回一个 Card 组件，其中包含一条消息，指示当天没有任务。它在没有数据或数据数组为空时呈现。 */
    return (
      <Card shadow="md" withBorder>
        <Stack>
          <Title order={2}>今日任务</Title>
          <Divider />
          <Center>今日休息</Center>
        </Stack>
      </Card>
    );
  }

  /* 此代码块返回一个 JSX
  元素，该元素呈现当天的任务表。它首先映射包含“TodoType”对象数组的“data”数组，并根据其“currentAmount”和“totalAmount”属性计算每个任务的进度。然后它为每个任务呈现一个表格行，显示其名称、计划结束日期，以及作为彩色进度条的进度。如果任务有描述，它会显示在悬停卡中，当用户将鼠标悬停在任务名称上时会出现该卡。整个表格包裹在一个带有标题和分隔符的“Card”组件中。 */
  return (
    <Card shadow="md" withBorder>
      <Stack>
        <Title order={2}>今日任务</Title>
        <Divider />
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>名称</th>
              <th>预计结束时间</th>
              <th>进度</th>
            </tr>
          </thead>
          <tbody>
            {data.map((todo) => {
              const progress = (todo.currentAmount / todo.totalAmount) * 100;
              return (
                <tr key={todo.id}>
                  <td>
                    {todo.description?.length ? (
                      <HoverCard position="bottom-start">
                        <HoverCard.Target>
                          <Text>{todo.name}</Text>
                        </HoverCard.Target>
                        <HoverCard.Dropdown sx={{ maxWidth: 320 }}>
                          {todo.description.split('\n').map((value) => (
                            <Text key={value}>{value}</Text>
                          ))}
                        </HoverCard.Dropdown>
                      </HoverCard>
                    ) : (
                      <Text>{todo.name}</Text>
                    )}
                  </td>
                  <td>
                    {progress < 100 ? todo.plannedEndDate : todo.actualEndDate}
                  </td>
                  <td>
                    <Progress
                      sections={[
                        {
                          value: progress,
                          color: progress < 100 ? 'blue' : 'green',
                        },
                      ]}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Stack>
    </Card>
  );
}

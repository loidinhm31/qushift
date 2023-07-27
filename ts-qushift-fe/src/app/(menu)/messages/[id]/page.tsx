"use client";

import { Box, HStack, Stack, useColorModeValue, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useReducer, useState } from "react";
import useSWR from "swr";

import { InputBox } from "@/components/Messages/InputBox";
import { MessageBox } from "@/components/Messages/MessageBox";
import { TopicMember } from "@/components/Topic/TopicMember";
import { TopicMenu } from "@/components/Topic/TopicMenu";
import { initialState, useMessageReducer } from "@/hooks/message/useMessageReducer";
import { get } from "@/lib/api";
import { Topic } from "@/types/Conversation";

export default function MessageDetail({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data: session } = useSession();

  const boxBgColor = useColorModeValue("white", "gray.800");
  const boxAccentColor = useColorModeValue("gray.200", "gray.900");

  const [wasSentSignal, setWasSentSignal] = useState<boolean>(false);

  const [currTopic, setCurrTopic] = useState<Topic>();

  const [msgState, dispatch] = useReducer(useMessageReducer, initialState);

  useSWR<Topic>(`/api/topics/${params.id}`, get, {
    onSuccess: (data) => {
      setCurrTopic(data);
    },
    onError: () => {
      router.push("/404");
    }
  });

  useEffect(() => {
    if (session && !session.user) {
      redirect("/signin");
      return;
    }
  }, [session]);

  return (
    <Stack className="sticky sm:h-full">
      <Head>
        <title>QuShift - {currTopic && currTopic.name}</title>
        <meta name="description" />
      </Head>

      <HStack className="gap-2 sm:flex sm:flex-col sm:justify-between p-4 h-full" alignItems="flex-start">
        <Box
          width={["100%", "100%", "100px", "fit-content"]}
          backgroundColor={boxBgColor}
          boxShadow="base"
          dropShadow={boxAccentColor}
          borderRadius="xl"
          className="p-4 h-full shadow"
        >
          <TopicMenu currTopicId={params.id} sendSignal={wasSentSignal} dispatch={dispatch} />
        </Box>

        <Box className="p-4 h-full">
          <Box
            as="b"
            fontSize="2xl"
            gap="2"
            width={["full", "full", "full", "fit-content"]}
            maxWidth={["full", "full", "full", "2xl"]}
            p="2"
            m="2"
            borderRadius="md"
            bg={boxAccentColor}
          >
            {currTopic && currTopic.name}
          </Box>

          <HStack h="full" display="flex" alignItems="flex-start">
            <VStack align="stretch" className="h-full">
              <MessageBox key={params.id} topicId={params.id} onMouseAction={setWasSentSignal} />

              <InputBox currTopicId={params.id} message={msgState.message} dispatch={dispatch} />
            </VStack>

            {currTopic && (
              <Box
                gap="2"
                width={["full", "full", "full", "fit-content"]}
                maxWidth={["full", "full", "full", "2xl"]}
                p="1"
                m="1"
                borderRadius="md"
                bg={boxBgColor}
                className="h-full"
              >
                <TopicMember key={params.id} currTopic={currTopic} />
              </Box>
            )}
          </HStack>
        </Box>
      </HStack>
    </Stack>
  );
}
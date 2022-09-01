import React from 'react'
// mantine dev
import { Card, Avatar, Box, Text, Button } from '@mantine/core';
// styles
import styles from './styles.GA.module.scss';

const URL_QUERY_ID_NAME = "agent-id";

const CardAgent = ({ data, index }) => {

    return (
      <Card
        shadow={null}
        p="lg"
        radius={null}
        withBorder={false}
        data-aos-once="true"
        data-aos-duration="900"
        data-aos-delay={`${900 + index * 200}`}
        data-aos="fade-left"
      >
        <Card.Section className="p-[20px] flex justify-center items-center">
          <Avatar radius={80} size={170} src={data.avatarProfile} />
        </Card.Section>
        <Box className="flex flex-col items-center justify-center gap-2">
          <Text className={styles.titleAgent} component="p">
            {`${data.firstName} ${data.lastName}`}
          </Text>
          <Text className={styles.subTitleAgent} component="span">
            {data.position}
          </Text>
          <Button
            component="a"
            href={`/agent/?${URL_QUERY_ID_NAME}=${data.id}`}
            className={styles.ButtonProfileAgent}
            variant="light"
            radius="xl"
            size="md"
          >
            View Profile
          </Button>
        </Box>
      </Card>
    );
}

export default CardAgent
package com.flo.qushift.controller;


import com.flo.qushift.document.Message;
import com.flo.qushift.document.StreamMessage;
import com.flo.qushift.dto.MessageDto;
import com.flo.qushift.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageService messageService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<StreamMessage> pushMessage(@RequestBody MessageDto messageDto) {
        Mono<StreamMessage> streamMessageMono = messageService.saveMessage(messageDto);
        return streamMessageMono;
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<StreamMessage> streamMessages(@RequestParam String topicId) {
        return messageService.getTailMessages(topicId);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<Message> retrieveMessages(@RequestParam String topicId,
                                          @RequestParam Integer start,
                                          @RequestParam Integer size) {
        return messageService.getPaginatedMessages(topicId, start, size);
    }
}
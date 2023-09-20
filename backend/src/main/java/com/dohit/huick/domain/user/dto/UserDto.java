package com.dohit.huick.domain.user.dto;

import java.time.LocalDateTime;

import com.dohit.huick.api.user.dto.UserApiDto;
import com.dohit.huick.domain.auth.constant.Role;
import com.dohit.huick.domain.auth.constant.SocialType;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserDto {

	private Long userId;
	private String name;
	private String rrn;
	private String address;
	private String walletAddress;
	private SocialType socialType;
	private String socialId;
	private LocalDateTime createdTime;
	private Role role;
	private LocalDateTime withdrawalTime;
	private String signatureUrl;
	private LocalDateTime issueDate;

	@Builder
	private UserDto(Long userId, String name, String rrn, String address, String walletAddress, SocialType socialType,
		String socialId, LocalDateTime createdTime, Role role, LocalDateTime withdrawalTime, String signatureUrl,
		LocalDateTime issueDate) {
		this.userId = userId;
		this.name = name;
		this.rrn = rrn;
		this.address = address;
		this.walletAddress = walletAddress;
		this.socialType = socialType;
		this.socialId = socialId;
		this.createdTime = createdTime;
		this.role = role;
		this.withdrawalTime = withdrawalTime;
		this.signatureUrl = signatureUrl;
		this.issueDate = issueDate;
	}

	public static UserDto of(Long userId, UserApiDto.Request request) {
		return UserDto.builder()
			.userId(userId)
			.name(request.getName())
			.rrn(request.getRrn())
			.address(request.getAddress())
			.build();
	}
}
